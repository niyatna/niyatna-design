// Localized display labels for the curated facet SUBCATEGORIES
// (`./facets.ts`). The taxonomy table keeps English labels as the
// canonical data (slugs and grouping are derived from it for filtering),
// while every rendering surface — the Home composer sub-type rail and the
// Community subcategory pills — resolves the visible text through the
// typed i18n dict. Unknown slugs (a newly added facet before its key
// lands) fall back to the table's English label.

import type { useT } from '../../i18n';
import { commercialCategoryLabel, isCommercialCategoryId } from './categoryLabel';

export function pluginSubfacetLabel(
  slug: string,
  fallback: string,
  t: ReturnType<typeof useT>,
): string {
  let label = '';
  if (isCommercialCategoryId(slug)) {
    label = commercialCategoryLabel(slug, t);
  } else {
    switch (slug) {
      case 'business-dashboards': label = t('pluginsHome.subfacet.business-dashboards'); break;
      case 'app-prototypes': label = t('pluginsHome.subfacet.app-prototypes'); break;
      case 'landing-marketing': label = t('pluginsHome.subfacet.landing-marketing'); break;
      case 'developer-tools': label = t('pluginsHome.subfacet.developer-tools'); break;
      case 'docs-reports': label = t('pluginsHome.subfacet.docs-reports'); break;
      case 'brand-design': label = t('pluginsHome.subfacet.brand-design'); break;
      case 'pitch-business': label = t('pluginsHome.subfacet.pitch-business'); break;
      case 'course-training': label = t('pluginsHome.subfacet.course-training'); break;
      case 'reports-briefings': label = t('pluginsHome.subfacet.reports-briefings'); break;
      case 'product-sales': label = t('pluginsHome.subfacet.product-sales'); break;
      case 'engineering-talks': label = t('pluginsHome.subfacet.engineering-talks'); break;
      case 'creative-decks': label = t('pluginsHome.subfacet.creative-decks'); break;
      case 'ui-product-mockups': label = t('pluginsHome.subfacet.ui-product-mockups'); break;
      case 'brand-visuals': label = t('pluginsHome.subfacet.brand-visuals'); break;
      case 'storyboards-motion-refs': label = t('pluginsHome.subfacet.storyboards-motion-refs'); break;
      case 'social-content': label = t('pluginsHome.subfacet.social-content'); break;
      case 'avatar-portrait': label = t('pluginsHome.subfacet.avatar-portrait'); break;
      case 'illustration-style': label = t('pluginsHome.subfacet.illustration-style'); break;
      case 'motion-effects': label = t('pluginsHome.subfacet.motion-effects'); break;
      case 'social-short-form': label = t('pluginsHome.subfacet.social-short-form'); break;
      case 'marketing-product': label = t('pluginsHome.subfacet.marketing-product'); break;
      case 'data-explainers': label = t('pluginsHome.subfacet.data-explainers'); break;
      case 'cinematic-story': label = t('pluginsHome.subfacet.cinematic-story'); break;
      default: label = fallback; break;
    }
  }
  if (!label || label.startsWith('pluginsHome.') || label.trim() === '') {
    return fallback || slug;
  }
  return label;
}
