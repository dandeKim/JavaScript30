# 💪 Array Cardio

## Array.prototype.filter()

Filter the list of inventors for those who were born in the 1500's

```javascript
const fifteen = inventors.filter(
  (inventor) => inventor.year >= 1500 && inventor.year < 1600
);
```

## Array.prototype.map()

Give us an array of the inventors first and last names

```javascript
const fullNames = inventors.map(
  (inventor) => `${inventor.first} ${inventor.last}`
);
```

## Array.prototype.sort()

Sort the inventors by birthdate, oldest to youngest

```javascript
const ordered = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));
```

## Array.prototype.reduce()

How many years did all the inventors live all together?

```javascript
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);
```

## Sort the inventors by years lived

```javascript
const oldest = inventors.sort((a, b) => {
  const lastGuy = a.passed - a.year;
  const nextGuy = b.passed - b.year;
  return lastGuy > nextGuy ? -1 : 1;
});
```

## create a list of Boulevards in Paris that contain 'de' anywhere in the name

test : [wikipedia Boulevards_in_Paris](https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris)

```javascript
const category = document.querySelector(".mw-category");
const links = Array.from(category.querySelectorAll("a"));
const de = links
  .map((link) => link.textContent)
  .filter((streetName) => streetName.includes("de"));
```

## sort Exercise

Sort the people alphabetically by last name

```javascript
const alpha = people.sort((a, b) => {
  const [aLast, aFirst] = a.split(", ");
  const [bLast, bFirst] = b.split(", ");
  return aLast > bLast ? 1 : -1;
});
```

## Reduce Exercise

Sum up the instances of each of these

```javascript
const transportation = data.reduce((obj, item) => {
  if (!obj[item]) obj[item] = 0;
  obj[item]++;

  return obj;
}, {});
```
