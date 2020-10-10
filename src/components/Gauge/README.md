The component **Gauge**

```tsx
function CallerComponent() {
  const [state, setState] = React.useState(0);
  return (
    <React.Fragment>
          <Gauge note={state} max={10} style={{ width: "3em", height: "auto" }} />
      <p>{'The value in the Gauge [min=0, max=10] is  : '}</p>
      <input
        type="number"
        value={state}
        onChange={(event) => {
          event.stopPropagation();
          setState(event.target.value);
        }}
      />
    </React.Fragment>
  );
}

<CallerComponent />;
```
