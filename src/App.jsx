import 'App.css';
import * as React from 'react';

export default function App() {
  return <List items={items} />;
}

const EVENT_FRUIT_CHANGED = 'fruit_changed';

const Display = () => {
  const [selectedFruits, setSelectedFruits] = React.useState([]);

  React.useEffect(() => {
    document.addEventListener(EVENT_FRUIT_CHANGED, function ({ detail }) {
      const { selected, name } = detail;
      if (selected) {
        setSelectedFruits((selectedFruits) => [...selectedFruits, name]);
      } else {
        setSelectedFruits((selectedFruits) => selectedFruits.filter((fruit) => fruit !== name));
      }
    });
  }, []);

  return (
    <div className="Display">
      <h2 className="Display__title">Currently selected items:</h2>
      <ul className="Display__list">
        {selectedFruits.map((fruitName) => (
          <li className="Display__item" key={fruitName}>
            {fruitName}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Item = ({ name, onClick }) => {
  const [selected, setSelected] = React.useState(false);

  const handleOnClick = (name) => {
    onClick(!selected, name);
    setSelected((selected) => !selected);
  };

  return (
    <div className={selected ? 'List__item--selected' : ''} onClick={() => handleOnClick(name)}>
      {name}
    </div>
  );
};

const List = ({ items }) => {
  const eventDispatcher = (selected, name) =>
    document.dispatchEvent(new CustomEvent(EVENT_FRUIT_CHANGED, { detail: { selected, name } }));

  return (
    <>
      <h1>Colored Fruit Picker</h1>
      <Display />
      <ul className="List">
        {items.map((item) => (
          <li key={item.name} className={`List__item List__item--${item.color}`}>
            <Item name={item.name} onClick={eventDispatcher} />
          </li>
        ))}
      </ul>
    </>
  );
};

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = [
  'navy',
  'blue',
  'aqua',
  'teal',
  'olive',
  'green',
  'lime',
  'yellow',
  'orange',
  'red',
  'maroon',
  'fuchsia',
  'purple',
  'silver',
  'gray',
  'black'
];
const fruits = [
  'apple',
  'banana',
  'watermelon',
  'orange',
  'peach',
  'tangerine',
  'pear',
  'kiwi',
  'mango',
  'pineapple'
];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color
            }
          ],
          []
        )
      ],
      []
    )
  ],
  []
);
