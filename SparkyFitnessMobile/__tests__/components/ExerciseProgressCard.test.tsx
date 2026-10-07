import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ExerciseProgressCard from '../../src/components/ExerciseProgressCard';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: () => true,
}));

const baseProps = {
  exerciseMinutes: 45,
  exerciseMinutesGoal: 30,
  exerciseCalories: 300,
  exerciseCaloriesGoal: 400,
};

describe('ExerciseProgressCard', () => {
  it('converts energy totals and goals without changing exercise minutes', () => {
    const view = render(
      <ExerciseProgressCard {...baseProps} energyUnit="kJ" />
    );
    expect(view.getByText('1255 / 1674 kJ')).toBeTruthy();
    expect(view.getByText('45 / 30 min')).toBeTruthy();
  });

  it('opens statistics from the card header', () => {
    const onPressDetails = jest.fn();
    const { getByText } = render(
      <ExerciseProgressCard {...baseProps} onPressDetails={onPressDetails} />
    );
    fireEvent.press(getByText('Statistics'));
    expect(onPressDetails).toHaveBeenCalledTimes(1);
  });

  it('shows no statistics link without a handler', () => {
    const { queryByText } = render(<ExerciseProgressCard {...baseProps} />);
    expect(queryByText('Statistics')).toBeNull();
  });
});
