# 💪 Array Cardio 2

## Array.prototype.some()

is at least one person 19 or older?

```javascript
const isAdult = people.some(
  (person) => new Date().getFullYear() - person.year >= 19
);
```

## Array.prototype.every()

is everyone 19 or older?

```javascript
const AllAdults = people.every(
  (person) => new Date().getFullYear() - person.year >= 19
);
```

## Array.prototype.find()

Find is like filter, but instead returns just the one you are looking for
Find the comment with the ID of 823423

```javascript
const comment = comments.find((comment) => comment.id === 823423);
```

## Array.prototype.findIndex()

Find the comment with this ID
Delete the comment with the ID of 823423

```javascript
const index = comments.findIndex((comment) => comment.id === 823423);
```
