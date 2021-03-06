import { getRepeatedItems } from "./getRepeatedItems";

const RepeatedItem = () => {
  const fetchedItems = getRepeatedItems();
  const repeatedItem = fetchedItems.map((item) => {
    return <div>{item.title}</div>;
  });

  return <div>{repeatedItem}</div>;
};
