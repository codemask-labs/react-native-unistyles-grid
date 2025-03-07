# react-native-unistyles-grid

A flexible and responsive grid system for React Native applications, built on top of [react-native-unistyles](unistyl.es). It works with `12` columns layout system and provides a simple API to define responsive layouts.

## Installation

```bash
npm install react-native-unistyles-grid
```

```bash
yarn add react-native-unistyles-grid
```

```bash
pnpm add react-native-unistyles-grid
```

```bash
bun add react-native-unistyles-grid
```

## Init (optional)

Add the following code bellow unistyles init function, to update default grid config:

```ts
import { UnistylesGrid } from 'react-native-unistyles-grid'

UnistylesGrid.init((theme) => ({
    containerPaddingVertical: theme.gap(3),
    containerPaddingHorizontal: theme.gap(2),
    rowGap: theme.gap(1),
    columnGap: {
        xs: theme.gap(1),
        md: theme.gap(2)
    }
}))
```

**Config**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| paddingVertical | number \| Record<UnistylesBreakpoint, number> | 0 | Vertical padding of the container |
| paddingHorizontal | number \| Record<UnistylesBreakpoint, number> | 0 | Horizontal padding of the container |
| rowGap | number \| Record<UnistylesBreakpoint, number> | 0 | Gap between rows |
| columnGap | number \| Record<UnistylesBreakpoint, number> | 0 | Gap between columns |

### Components

#### Container

A wrapper component that provides consistent padding and layout constraints for your grid system.

**Props**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| paddingVertical | number \| Record<UnistylesBreakpoint, number> | Comes from config | Vertical padding of the container |
| paddingHorizontal | number \| Record<UnistylesBreakpoint, number> | Comes from config | Horizontal padding of the container |
| rowGap | number \| Record<UnistylesBreakpoint, number> | Comes from config | Gap between rows |

```tsx
<Container rowGap={theme.gap(3)}>
    {/* Layout */}
</Container>
```

#### Row

A horizontal container that holds Col components and manages their layout.

**Props**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| columnGap | number \| Record<UnistylesBreakpoint, number> | Comes from config | Gap between columns |

```tsx
<Row columnGap={theme.gap(2)}>
    {/* Columns */}
</Row>
```

#### Col

A column component that defines width and positioning within a Row.

**Props**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| UnistylesBreakpoint (xs, md, lg, etc.) | ColumnConfig | undefined | Config of the column |

```ts
type SpanValue = number | 'auto' | true | string

type OrderValue = 'first' | 'last' | number

type ColumnConfig =
    | SpanValue
    | {
        span?: SpanValue
        order?: OrderValue
        offset?: number
        hide?: true
    }
```

| Type | Example | Description |
| --- | --- | --- |
| number \| string | 4 \| '4' | Amount of columns that the column should span |
| 'auto' | 'auto' | Column will shrink to fit the content |
| true | `true` | Column will take all available space (if multiple columns are defined, it is distributed evenly between them) |
| { span: SpanValue } | { span: 4 } | Same as above, but passed in an object |
| { offset: number } | { offset: 4 } | Column will be offset by the given number of columns from the left |
| { order: OrderValue } | { order: 'last' } | Column will be positioned last, regardless of the order of the columns in the JSX |
| { hide: true } | { hide: true } | Column won't be rendered on the given breakpoint |

```tsx
<Col xs={4} md={{ offset: 4, span: 4 }}>
    {/* Content */}
</Col>
```

### Example usage

```tsx
<Container>
    <Row>
        {/* Auto-layout columns */}
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
    </Row>
    <Row>
        {/* Setting one column width */}
        <Row>
            <Col>1 of 3</Col>
            <Col xs={6}>2 of 3 (wider)</Col>
            <Col>3 of 3</Col>
        </Row>
    </Row>
    {/* Centered column */}
    <Row>
        <Col xs={{ offset: 4, span: 4 }}>Centered</Col>
    </Row>
    {/* Responsive grids */}
    <Row>
        <Col xs={12} md={6} lg={4}>xs=12 md=6 lg=4</Col>
        <Col xs={12} md={6} lg={4}>xs=12 md=6 lg=4</Col>
        <Col xs={12} md={6} lg={4}>xs=12 md=6 lg=4</Col>
    </Row>
</Container>
```


## License

MIT
