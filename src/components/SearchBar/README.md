The component **SearchBar**

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
