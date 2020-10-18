The component **SearchBar** is a form with input test and submit button  

When form is submitted, the input value is returned by the function `props.onSearch(value : string)` 

```tsx
function CallerComponent() {
  const [state, setState] = React.useState('');
  const getSearch = (SearchedValue) => {
    setState(SearchedValue);
  };
  return (
    <React.Fragment>
      <SearchBar onSearch={getSearch} />
      <p>{`The value searched is  : "${state}"`}</p>
    </React.Fragment>
  );
}

<CallerComponent />;
```
