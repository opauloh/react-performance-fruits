import 'App.css';
import { Fragment, memo, useState } from 'react';

export default function App() {
  return <List items={items} />;
}

const ListItem = memo(({ item, selected, handleSelect }) => (
  <li
    key={item.name}
    className={`List__item List__item--${item.color} ${selected && 'selected'}`}
    onClick={() => handleSelect(item.name)}>
    {item.name}
    {console.log('rendering', item)}
  </li>
));

const List = memo(({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (itemName) => {
    if (selectedItems.indexOf(itemName) > -1) {
      setSelectedItems(selectedItems.filter((item) => item !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const isSelectedItem = (itemName) => {
    return selectedItems.indexOf(itemName) > -1;
  };

  return (
    <Fragment>
      <div className="selected-list">
        {selectedItems.length > 0 && <h3>Selected Items:</h3>}
        {selectedItems.map((selectedItem) => (
          <li key={selectedItem}>{selectedItem}</li>
        ))}
      </div>
      <ul className="List">
        {items.map((item) => (
          <ListItem
            key={item.name}
            item={item}
            selected={isSelectedItem(item.name)}
            handleSelect={handleSelect}
          />
        ))}
      </ul>
    </Fragment>
  );
});

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
