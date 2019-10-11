const dateFns = require('date-fns');
const get = require('lodash').get;

const CSV_COLUMNS = [
  'id',
  'handle',
  'friends',
  'firstName',
  'lastName',
  'birthday',
  'age',
  'gender',
  'country',
  'city',
  'latitude',
  'longitude',
  'streetName',
  'streetNumber',
  'avatar',
  'email',
  'facebook',
  'ip'
];

const parseJsonLine = line => {
  try {
    if (line) return JSON.parse(line);
  } catch (e) {
    console.log(`\nWarning!: Could not parse line: ${line.slice(0, 50)}...`);
  }
};

const parseISOdate = date => dateFns.parseISO(date);

const isDateValid = date => dateFns.isValid(parseISOdate(date));

const getBirthDate = birthDate =>
  (isDateValid(birthDate) && birthDate) || undefined;

const calculateAge = birthDate =>
  (isDateValid(birthDate) &&
    dateFns.differenceInYears(new Date(), parseISOdate(birthDate))) ||
  undefined;

const getLatLongItude = coordinates => {
  if (!coordinates) return {};

  let [latitude, longitude] = coordinates.split(',');
  return latitude && longitude
    ? {
        latitude: latitude && latitude.trim(),
        longitude: longitude && longitude.trim()
      }
    : {};
};

const formatData = data => {
  return {
    id: data.id,
    handle: data.handle,
    friends: data.friends && data.friends.length && data.friends.join(';'),
    firstName: get(data, 'personal.name.first'),
    lastName: get(data, 'personal.name.last'),
    birthday: getBirthDate(get(data, 'personal.birthday')),
    age: calculateAge(get(data, 'personal.birthday')),
    gender: get(data, 'personal.gender'),
    country: get(data, 'location.country'),
    city: get(data, 'location.city'),
    ...getLatLongItude(get(data, 'location.coordinates')),
    streetName: get(data, 'location.street.name'),
    streetNumber: get(data, 'location.street.number'),
    avatar: get(data, 'web.avatar'),
    email: get(data, 'web.email'),
    facebook: get(data, 'web.facebook'),
    ip: get(data, 'web.ip')
  };
};

const updateStats = (stats, row) => {
  stats.usersCount += 1;
  stats.friendsCount += (row.friends && row.friends.length) || 0;
};

const displaySummary = stats => {
  const users = stats.usersCount;
  const avgFriends = (stats.friendsCount / stats.usersCount).toFixed(1);

  console.log('> Finished. CSV Ready!');
  console.log('> SUMMARY:');
  console.log(`- number of users ${users}`);
  console.log(`- user has ${avgFriends} friends on average`);
};

module.exports = {
  CSV_COLUMNS,
  parseJsonLine,
  formatData,
  updateStats,
  displaySummary
};
