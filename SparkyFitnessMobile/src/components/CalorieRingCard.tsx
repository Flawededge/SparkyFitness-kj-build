import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { useCSSVariable } from 'uniwind';
import { formatEnergyValue, type EnergyUnit } from '../utils/energyDisplay';
import ProgressRing from './ProgressRing';

interface SideStatProps {
  label: string;
  value: number;
  energyUnit: EnergyUnit;
}

const SideStat: React.FC<SideStatProps> = ({ label, value, energyUnit }) => (
  <View className="items-center justify-center flex-1">
    <Text className="text-xl font-bold text-text-primary">
      {formatEnergyValue(value, energyUnit)}
    </Text>
    <Text className="text-text-secondary text-xs mt-1">{label}</Text>
  </View>
);

interface CalorieRingCardProps {
  caloriesConsumed: number;
  caloriesBurned: number;
  calorieGoal: number;
  remainingCalories: number;
  progressPercent: number;
  energyUnit?: EnergyUnit;
}

const CalorieRingCard: React.FC<CalorieRingCardProps> = ({
  caloriesConsumed,
  caloriesBurned,
  calorieGoal,
  remainingCalories,
  progressPercent,
  energyUnit = 'kcal',
}) => {
  const { t } = useTranslation();
  const [progressTrackColor, progressFillColor] = useCSSVariable([
    '--color-progress-track',
    '--color-calories',
  ]) as [string, string];

  const displayRemaining = remainingCalories || 0;

  return (
    <View className="bg-surface rounded-xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-center">
        <SideStat
          label={t('dashboard.consumed', { defaultValue: 'Consumed' })}
          value={caloriesConsumed}
          energyUnit={energyUnit}
        />

        <View className="relative items-center justify-center mx-2">
          <View>
            <ProgressRing
              progress={progressPercent}
              size={160}
              strokeWidth={12}
              color={progressFillColor}
              backgroundColor={progressTrackColor}
            />
          </View>
          <View className="absolute items-center justify-center">
            <Text className="text-2xl font-bold text-text-primary">
              {formatEnergyValue(displayRemaining, energyUnit)}
            </Text>
            <Text className="text-text-secondary text-xs">
              {t('dashboard.remaining', { defaultValue: 'remaining' })}
            </Text>
            <Text className="text-text-muted text-xs mt-0.5">
              {t('dashboard.ofEnergy', {
                defaultValue: 'of {{value}} {{unit}}',
                unit: energyUnit,
                value: formatEnergyValue(calorieGoal, energyUnit),
              })}
            </Text>
          </View>
        </View>

        <SideStat
          label={t('dashboard.burned', { defaultValue: 'Burned' })}
          value={caloriesBurned}
          energyUnit={energyUnit}
        />
      </View>
    </View>
  );
};

export default CalorieRingCard;
