import React from 'react';
import { render } from '@testing-library/react-native';
import CalorieRingCard from '../../src/components/CalorieRingCard';

jest.mock('../../src/components/ProgressRing', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: ({ progress }: { progress: number }) => (
      <View testID="energy-progress" accessibilityValue={{ now: progress }} />
    ),
  };
});

const props = {
  caloriesConsumed: 500,
  caloriesBurned: 100,
  calorieGoal: 2000,
  remainingCalories: 1600,
  progressPercent: 0.25,
};

describe('CalorieRingCard energy preference', () => {
  it('converts all displayed energy while preserving progress and input data', () => {
    const original = { ...props };
    const view = render(<CalorieRingCard {...props} energyUnit="kJ" />);
    expect(view.getByText('2,092')).toBeTruthy();
    expect(view.getByText('418')).toBeTruthy();
    expect(view.getByText('6,694')).toBeTruthy();
    expect(view.getByText('of 8,368 kJ')).toBeTruthy();
    expect(
      view.getByTestId('energy-progress').props.accessibilityValue.now
    ).toBe(0.25);
    expect(props).toEqual(original);

    view.rerender(<CalorieRingCard {...props} energyUnit="kcal" />);
    expect(view.getByText('500')).toBeTruthy();
    expect(view.getByText('of 2,000 kcal')).toBeTruthy();
    expect(view.queryByText('of 8,368 kJ')).toBeNull();
  });

  it('converts negative remaining energy before rounding', () => {
    const view = render(
      <CalorieRingCard {...props} remainingCalories={-0.4} energyUnit="kJ" />
    );
    expect(view.getByText('-2')).toBeTruthy();
  });

  it('defaults to kcal until a preference is available', () => {
    const view = render(<CalorieRingCard {...props} />);
    expect(view.getByText('of 2,000 kcal')).toBeTruthy();
    expect(view.getByText('1,600')).toBeTruthy();
  });
});
