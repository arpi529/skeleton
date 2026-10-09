import { catalogSource } from './data.js';

const PRODUCTS_PER_COLLECTION = 12;

function getDescription(markup) {
  const document = new DOMParser().parseFromString(markup || '', 'text/html');
  document.querySelectorAll('script, style, meta, noscript').forEach((node) => node.remove());
  const description = document.querySelector('p') || document.body;
  return (description.textContent || '').replace(/\s+/g, ' ').trim();
}

function normalizeProduct(product, collection) {
  const availableVariants = (product.variants || [])
    .filter((variant) => variant.available && Number.isFinite(Number(variant.price)))
    .sort((first, second) => Number(first.price) - Number(second.price));
  const image = product.images?.[0]?.src || availableVariants[0]?.featured_image?.src;
  const description = getDescription(product.body_html);

  if (!availableVariants.length || !image || !description || !product.handle) return null;

  return {
    id: String(product.id),
    title: product.title,
    description,
    image,
    price: Number(availableVariants[0].price),
    compareAtPrice: Number(availableVariants[0].compare_at_price) || null,
    availableVariants: availableVariants.map((variant) => variant.title).filter((title) => title && title !== 'Default Title'),
    category: collection.label,
    vendor: product.vendor || catalogSource.name,
    url: `${catalogSource.baseUrl}/products/${encodeURIComponent(product.handle)}`,
  };
}

async function fetchCollection(collection, signal) {
  const url = `${catalogSource.baseUrl}/collections/${encodeURIComponent(collection.handle)}/products.json?limit=${PRODUCTS_PER_COLLECTION}`;
  const response = await fetch(url, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`${collection.label} catalog returned HTTP ${response.status}.`);
  }

  const data = await response.json();
  if (!Array.isArray(data.products)) {
    throw new Error(`${collection.label} catalog returned an unexpected response.`);
  }

  return data.products
    .map((product) => normalizeProduct(product, collection))
    .filter(Boolean)
    .slice(0, 4);
}

export async function fetchDepartmentProducts(collections, signal) {
  const results = await Promise.allSettled(
    collections.map((collection) => fetchCollection(collection, signal)),
  );
  const errors = [];
  const products = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      products.push(...result.value);
    } else if (result.reason?.name !== 'AbortError') {
      errors.push(`${collections[index].label}: ${result.reason.message}`);
    }
  });

  if (errors.length === collections.length) {
    throw new Error(errors.join(' '));
  }

  const uniqueProducts = [...new Map(products.map((product) => [product.id, product])).values()];

  return {
    products: uniqueProducts,
    errors,
    checkedAt: new Date(),
  };
}
