import { convertEnergyValue } from '@workspace/shared';
import { formatLocalizedNumber } from '../localization';
import type { UserPreferences } from '../types/preferences';

export type EnergyUnit = NonNullable<UserPreferences['energy_unit']>;

/** Convert only at the display boundary; stored energy and calculations stay in kcal. */
export function formatEnergyValue(
  kcal: number,
  unit: EnergyUnit = 'kcal'
): string {
  return formatLocalizedNumber(
    Math.round(convertEnergyValue(kcal, 'kcal', unit))
  );
}
