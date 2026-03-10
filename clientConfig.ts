// Re-export types and constants from types.ts for convenience
export { ALL_SLIDE_KEYS, SLIDE_LABELS } from './types';
export type { ClientConfig, SlideKey } from './types';

// Active config — NPI BV
import { npiPreset } from './presets/npi';

export const config = { ...npiPreset };
