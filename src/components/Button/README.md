The component **Button**

```tsx
function CallerComponent() {
  const [state, setState] = React.useState(0);
  const onClick = () => {
    setState(state + 1);
  };
  return (
    <React.Fragment>
      <Button name="Button" onClick={onClick} />
      <p>{`The button has been clicked : "${state}" times`}</p>
    </React.Fragment>
  );
}

<CallerComponent />;
```
