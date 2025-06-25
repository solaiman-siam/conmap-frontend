
import ListView from "./ListView";
import PinnedView from "./PinnedView";

const ProductsListView = ({ listView, setListView, pinnedView, setPinnedView }) => {
  return (
    <>
     {<ListView listView={listView} setListView={setListView}/>}
     {<PinnedView pinnedView={pinnedView} setPinnedView={setPinnedView}/>}
    </>
  );
};

export default ProductsListView;
