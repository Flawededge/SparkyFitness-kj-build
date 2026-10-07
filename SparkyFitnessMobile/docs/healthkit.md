## Exercise Session

1. Raw data from HealthKit (returned by readHealthRecords):
```json
{
  startTime: "2026-01-08T10:00:00.000Z",
  endTime: "2026-01-08T10:45:00.000Z",
  activityType: 37,  // numeric HKWorkoutActivityType
  duration: { unit: 's', quantity: 2700 },
  totalEnergyBurned: 320,  // kcal
  totalDistance: 5200,     // meters
}
```

2. Transformed data sent to server (after transformHealthRecords):

```json
{
  type: 'ExerciseSession',
  source: 'HealthKit',
  date: '2026-01-08',
  entry_date: '2026-01-08',
  timestamp: '2026-01-08T10:00:00.000Z',
  startTime: '2026-01-08T10:00:00.000Z',
  endTime: '2026-01-08T10:45:00.000Z',
  duration: 2700,           // seconds
  activityType: 'Running',  // human-readable name from ACTIVITY_MAP
  title: 'Running',
  caloriesBurned: 320,
  distance: 5200,
  notes: 'Source: HealthKit',
  raw_data: { ... }         // original record
}
```

## Two-way water sync on iOS

On the Sync screen, enable Hydration under both the health-data import settings
and Write to Apple Health. Grant Dietary Water read and write access when iOS
requests it. Water logged in Apple Health is imported into SparkyFitness; manual
SparkyFitness drinks are exported with their logged timestamps during health sync.
Imported drinks and samples written by SparkyFitness are excluded from the return
direction to avoid counting the same water twice.

If food-derived water is included in intake, it is exported as a separate noon
sample. Before noon, manually logged drinks can still export; the food remainder
is reconciled on a later sync. Edits and deletions replace the tracked samples on
dates covered by the normal writeback window. A failed delete postpones replacement
to avoid duplicating water; a failed save is retried on a subsequent sync.

To verify on an iPhone:
1. Enable both hydration directions and grant Apple Health permissions.
2. Log water in Apple Health, run sync, and confirm it appears once in SparkyFitness.
3. Log a drink in SparkyFitness before noon with food-water inclusion enabled,
   run sync, and confirm the drink appears in Apple Health at its logged time.
4. Sync again and confirm the totals do not increase.
5. Edit or delete a drink on today's diary, sync, and confirm Apple Health updates.
6. Sync after noon and confirm the food-water remainder appears separately.

Read access is hidden by HealthKit, so an empty import does not establish whether
read permission was granted. Check the app's access in Apple Health if needed.
