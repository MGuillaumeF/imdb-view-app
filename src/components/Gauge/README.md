The component **Gauge**

```tsx
function CallerComponent() {
  const [state, setState] = React.useState(4);
  return (
    <React.Fragment>
      <Gauge
        note={state}
        max={10}
        style={{ width: "3em", height: "auto" }}
        bgGaugeColor="#222"
      />
      <br />
      <Gauge
        note={state}
        max={10}
        style={{ width: "3em", height: "auto", border: "1px solid #333" }}
        strikeGaugeColor="cyan"
        fontGaugeColor="blue"
      />
      <br/>
      <label htmlFor="set">{"The value in the Gauge [min=0, max=10] is  : "}
        <input
          id="set"
          type="number"
          value={state}
          onChange={(event) => {
            event.stopPropagation();
            setState(event.target.value);
          }}
        />
      </label>
    </React.Fragment>
  );
}

<CallerComponent />;
```
