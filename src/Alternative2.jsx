import 'App.css';
import { Fragment, memo, useCallback, useState } from 'react';

export default function App() {
  return <List items={items} />;
}

const Item = memo(({ name, color, handleClick }) => {
  const [selected, setSelected] = useState(false);
  const handleSelection = () => {
    setSelected(!selected);
    handleClick(name);
  };
  console.log('selected', name);

  return (
    <li className={`List__item List__item--${color}`} onClick={handleSelection}>
      {selected ? <span className="List__item__selected">{'✓'}</span> : null}
      {name}
    </li>
  );
});

const List = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelection = useCallback((name) => {
    setSelectedItems((items) => {
      const isSelected = items.indexOf(name) > -1;
      let newSelectedItems = [...items];
      if (isSelected) {
        newSelectedItems = items.filter((item) => item !== name);
      } else {
        newSelectedItems.push(name);
      }
      return newSelectedItems;
    });
  }, []);

  return (
    <Fragment>
      <div class="List__selected-items">
        <h5>Selected Items:</h5>
        {selectedItems.length ? <p>{selectedItems.join(', ')}</p> : 'none'}
      </div>
      <ul className="List">
        {items.map((item) => (
          <Item {...item} key={item.name} handleClick={handleSelection} />
        ))}
      </ul>
    </Fragment>
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
