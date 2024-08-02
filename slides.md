---
# try also 'default' to start simple
theme: the-unnamed
highlighter: shiki
info: |
  ## React dengan TanStack
transition: slide-up
title: Devtalk | React with TanStack
mdc: true
fonts:
  serif: Robot Slab
  # for code blocks, inline code, etc.
  mono: JetBrains Mono
---

# React with Tanstack

---

### What is TanStack?

TanStack is a collection of open-source software libraries and tools primarily focused on building robust and performant web applications. It's most well-known for **React Query (now called TanStack Query)**, but includes several other popular libraries

- TanStack Query: Data fetching and state management library for web applications.
- TanStack Table: Headless UI for tables and datagrids.
- TanStack Router: A type-safe routing library
- TanStack Form: A form state management library
- TanStack Virtual: A library for efficiently rendering large lists and tabular data.

---

### Spot A Bug Here

```ts
function Bookmarks({ category }) {
	const [data, setData] = useState([])
	const [error, setError] = useState()

	useEffect(() => {
		fetch('http://localhost:3000/tasks/' + category)
			.then(res => res.json())
			.then(d => {
				setData(d)
			})
			.catch(e => {
				setError(e)
			})
	}, [category])
}
```

---

1. Race condition

Which on will come first and which on will come later?

````md magic-move {lines: false}
```ts {*|1|14|5-14|*}
function Bookmarks({ category }) {
	const [data, setData] = useState([])
	const [error, setError] = useState()

	useEffect(() => {
		fetch('http://localhost:3000/tasks/' + category)
			.then(res => res.json())
			.then(d => {
				setData(d)
			})
			.catch(e => {
				setError(e)
			})
	}, [category])
}
```

```ts {*|2|6-8|11-13|16-18|*}
useEffect(() => {
	let ignore = false
	fetch('http://localhost:3000/tasks/' + category)
		.then(res => res.json())
		.then(d => {
			if (!ignore) {
				setData(d)
			}
		})
		.catch(e => {
			if (!ignore) {
				setError(e)
			}
		})
	// clean up function
	return () => {
		ignore = true
	}
}, [category])
```
````

---

2. Loading state

````md magic-move {lines: false}
```ts
//
```

```ts
const [isLoading, setIsLoading] = useState(false)
```

```ts {*|5|7-11|*}
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  let ignore = false;
  setIsLoading(true);
    // same code
    .finally(() => {
      if (!ignore) {
        setIsLoading(false);
      }
    });
  return () => {
    ignore = true;
  };
}, [category]);
```
````

---

3. Empty state

Data could be empty too, so better to initialize with undefined

````md magic-move {lines: false}
```ts
const [data, setData] = useState([])
```

```ts
const [data, setData] = useState()
```
````

---

### Data & Error are not reset when category changes

We may get this

```
data: dataFromCurrentCategory
error: errorFromPreviousCategory
```

```tsx
return (
  <div>
    { error ? (
      <div>Error: {error.message}</div>
    ) : (
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</div>
        ))}
      </ul>
    )}
  </div>
)
```

---

To fix this, we have to reset our local state when category changes:

```ts {*|6|12|*}
useEffect(() => {
// same code
    .then((d) => {
      if (!ignore) {
        setData(d);
        setError(undefined);
      }
    })
    .catch((e) => {
      if (!ignore) {
        setError(e);
        setData(undefined);
      }
    })
// same code
```

---

### Error handling

````md magic-move {lines: false}
```ts
fetch(`${endpoint}/${category}`)
	.then(res => res.json())
	.then()
```

```ts
fetch(`${endpoint}/${category}`).then(res => {
	if (!res.ok) {
		throw new Error('Failed to fetch')
	}
	return res.json()
})
```
````

Why fetch doesn't reject on response? <a href="https://kettanaito.com/blog/why-fetch-promise-doesnt-reject-on-error-responses" target="blank">Check here</a>

---

## transition: slide-left

### Solution?

````md magic-move {lines:false}
```ts
function Bookmarks({ category }) {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState()
	const [error, setError] = useState()

	useEffect(() => {
		let ignore = false
		setIsLoading(true)
		fetch(`${endpoint}/${category}`)
			.then(res => res.json())
			.then(d => {
				if (!ignore) {
					setData(d)
				}
			})
			.catch(e => {
				if (!ignore) {
					setError(e)
				}
			})
			.finally(() => {
				if (!ignore) {
					setIsLoading(false)
				}
			})
		return () => {
			ignore = true
		}
	}, [category])
}
```

```ts
function Bookmarks({ category }) {
	const { isLoading, data, error } = useQuery({
		queryKey: ['bookmarks', category],
		queryFn: () =>
			fetch(`${endpoint}/${category}`).then(res => {
				if (!res.ok) {
					throw new Error('Failed to fetch')
				}
				return res.json()
			}),
	})

	// Return JSX based on data and error state
}
```

```ts
const getBookmarks = () => {
  fetch(`${endpoint}/${category}`).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      }),
}

function Bookmarks({ category }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookmarks", category],
    queryFn: getBookmarks,
  });

  // Return JSX based on data and error state
}
```
````

---

## class: 'text-center font-bold'

# Code walkthrough

---

### Editor

````md magic-move {lines:false}
```py
def get_full_name(first_name, last_name):
    return full_name


print(get_full_name("john", "doe"))
```

```py
def get_full_name(first_name, last_name):
    full_name = first_name.title() + " " + last_name.title()
    return full_name

print(get_full_name("john", "doe"))
```
````

<div class="border border-red-500">
  <img src="https://www.ismiabbas.site/jom_launch.jpeg" width=100 height=100/>
</div>
