---
title: 'Redux Essentials から学ぶ Part1：Modern Redux とパフォーマンス最適化'
excerpt: '公式チュートリアルの Redux Essentials を読みながら、JavaScript を TypeScript に変換しつつ写経することで、redux-toolkit を使ったモダンな 書き方や RTK Query について学びました。'
coverImage: ''
publishDate: '2021-09-25'
ogImage:
  url: 'https://raw.githubusercontent.com/YTakahashii/blog/47bc1570103ff3178de2d5ba2e3376d5b3b9df04/public/assets/blog/lerning-from-redux-essentials-part1/ogimage.png'
---

アプリケーションの状態管理は、フロントエンド開発で注目されているトピックの 1 つです。
React のグローバル状態管理ライブラリといえば、2，3 年前は Redux 一強でしたが、2021 年現在は、[Apollo Client](https://www.apollographql.com/docs/react/), [Recoil](https://recoiljs.org/), [jotai](https://jotai.pmnd.rs/), [SWR](https://swr.vercel.app/) 等、様々なものがあります。

私は、2020 年の 3 月頃まで約 2 年ほど Redux を使った開発を経験していましたが、その後は SWR や Apollo Client を採用したプロジェクトで開発していたため、しばらく Redux から離れていました。
ですが、この度新卒エンジニアとして、9 月から Redux を使っているプロダクトの開発チームに本配属され、再び Redux と真剣に向き合うことになりました！

そんな中、先日参加した[Souzoh Tech Talk #03: Frontend](https://mercari.connpass.com/event/221978/)の中で紹介された、["feature pattern"](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic) という Redux 推奨のディレクトリ構成の話がきっかけで、Redux のドキュメントが 2020 年当時より大幅にアップデートされていることを知りました。

これは Redux を学び直す良い機会だなと思い、ここ 1 週間くらい、公式チュートリアルの Redux Essentials を読みながら、JavaScript を TypeScript に変換しつつ写経することで、redux-toolkit を使ったモダンな 書き方や RTK Query について学びました。

- https://github.com/YTakahashii/redux-essentials-example-app-ts

Redux Essentials は、全 8 回に渡る内容で、結構ボリューミーだったため、今回は Part1 と第して、第 1 回〜第 6 回までから得た学びをピックアップしてまとめます。

- [Redux Essentials, Part 1: Redux Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
- [Redux Essentials, Part 2: Redux App Structure](https://redux.js.org/tutorials/essentials/part-2-app-structure)
- [Redux Essentials, Part 3: Basic Redux Data Flow](https://redux.js.org/tutorials/essentials/part-3-data-flow)
- [Redux Essentials, Part 4: Using Redux Data](https://redux.js.org/tutorials/essentials/part-4-using-data)
- [Redux Essentials, Part 5: Async Logic and Data Fetching](https://redux.js.org/tutorials/essentials/part-5-async-logic)
- [Redux Essentials, Part 6: Performance and Normalizing Data](https://redux.js.org/tutorials/essentials/part-6-performance-normalization)

## 1. どのような状況で Redux を使うべきか

[Part 1: Redux Overview and Concepts の When Should I Use Redux?](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#when-should-i-use-redux)に、Redux が役立つ状況は以下の 4 つであることが述べられていました。

- アプリ内の多くの場所で必要とされる大量の State がある場合
- State が時間の経過とともに頻繁に更新される場合
- State を更新するロジックが複雑な場合
- アプリのコードベースが中規模または大規模で、多くの人が作業する可能性がある場合

「このデータは Redux で管理すべきか」を考えるときに、「アプリ内で多く参照されること」以外にも、state の更新頻度、複雑性、規模感も重要であることを明確に理解できました。

## 2. redux-toolkit を使った Modern Redux

Redux Essentials の Part 3 からは、ユーザが記事を投稿できるサンプルアプリの開発を通して、redux-toolkit を使った Redux アプリの構築を学びます。
代表的な API は以下の 3 つです。

- `createSlice()`
- `createAsyncThunk()`
- `createEntityAdapter()`

以下は、これらの API の要約です。

### createSlice() で Reducer に 集中したコードを書ける

`createSlice()` は `reducers` で定義された Reducer を元に、Action や ActionCreator を自動生成してくれます。

```ts
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        // note: prepare -> reducer
        state.push(action.payload);
      },
      prepare: ({ title, content, userId }: Pick<Post, 'title' | 'content'> & { userId: string }) => {
        // note: action creator相当のfunction
        // note: reduxはpostsSlice.actions.postAdded({ title, content }) がdispatchされるとprepareを実行し、reducerのactionに受け渡す
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: initialReactions,
          },
        };
      },
    },
  },
});

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
```

Redux のしんどかった要素として、Action や ActionCreator 等のボイラープレートの記述がだるい問題がありましたが、slice を使用することで解決できます。

Action は、React 内では、`dispatch(postAdded({ title, content, userId }))` のように dispatch します。
また、`store.dispatch(initiate())` のように、store の初期化時に React の外で dispatch することもできます。

手書き時代の ActionCreator 内部 で行っていたような処理は、`prepare()` を定義して実行することができます。

`createSlice()` 内部では Immer が使用されているため、`state.push(action.payload)` のように Mutable に state の更新を記述できる点もポイントですね。

### 非同期的な state の更新は createAsyncThunk() で簡単に書ける

データのフェッチ等の非同期処理は `createAsyncThunk()` を使います。

```ts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data as Post[];
});

const postsSlice = createSlice({
  //省略
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});
```

`createSlice()` の外部で定義された ActionCreator に紐づく reducer は `extraReducers` で定義します。
TypeScript で記述する場合は `builder.addCase()` 使って `state` と `action` の型を推論させる必要があります。

`createAsyncThunk()` で生成した thunk は `pending/fulfilled/rejected` パターンを dispatch するので、必要に応じてそれぞれの reducer を定義します。

### データの正規化は createEntityAdapter() にお任せ

データを正規化したい場合は、 `createEntityAdapter()` を使います。
デフォルトでは、 `{ ids: [], entities: { [id]: value } }` の形式で変換されます。

```ts
const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState<AsyncState>({
  status: 'idle',
  error: null,
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // 省略
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      postsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>((state) => state.posts);
```

adapter の役割は、データの正規化、正規化データの更新メソッドの提供、ids のソート、initialState の提供、selector の提供等、多岐に渡ります。

`getSelectors()` で取得できる selector は Reselect によってメモ化されているのも嬉しいポイントです。

手書き時代の Redux では、データの正規化のために`normalizr`による変換処理を定義する必要がありましたが、adapter にすべてが集約されていて開発者体験がとても良くなった印象です。

## 3. React のレンダリングパフォーマンスの最適化

[Redux Essentials, Part 6: Performance and Normalizing Data](https://redux.js.org/tutorials/essentials/part-6-performance-normalization) では、React のレンダリングパフォーマンスを向上するための手法が丁寧に解説されており、非常に学びになりました。

### コンポーネントを React.memo() でラップする

以下のように、親コンポーネントがリストデータを配列で持っている場合、その中の要素 1 つが更新されると配列全体が更新されてしまうため、結果的にリスト全体の再レンダリングが発生してしまいます。

これは、親コンポーネントが再レンダリングされると、子コンポーネントも再レンダリングしてしまうため、一つのアイテムを更新したのにも関わらず、リスト全体が再レンダリングされてしまうためです。

子コンポーネントを `React.memo()` でラップすることで、更新がなかった子コンポーネントは再レンダリングを回避することができます。

ただし、`<PostsList />` は `posts` が変わってしまうため再レンダリングを回避できないことに注意する必要があります。

```tsx
const PostExcerpt: React.NamedExoticComponent<{ post: Post }> = React.memo(({ post }) => (
  <article className="post-excerpt">
    <h3>{post.title}</h3>
    <div>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
    </div>
    <p className="post-content">{post.content.substring(0, 100)}</p>
    <ReactionButtons post={post} />
    <Link to={`/posts/${post.id}`} className="button muted-button">
      View Post
    </Link>
  </article>
));

export const PostsList: React.VFC = () => {
  const posts = useTypedSelector(selectAllPosts);
  const postStatus = useTypedSelector((state) => state.posts.status);
  const error = useTypedSelector((state) => state.posts.error);

  const orderedPosts = useMemo(
    () => (postStatus === 'succeeded' ? posts.slice().sort((a, b) => b.date.localeCompare(a.date)) : posts),
    [postStatus, posts]
  );

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {postStatus === 'loading' ? (
        <Spinner text="loading..." />
      ) : postStatus === 'succeeded' ? (
        orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)
      ) : postStatus === 'failed' ? (
        <div>{error}</div>
      ) : null}
    </section>
  );
};
```

### リストの親コンポーネントではアイテムの ids 配列だけを参照する

リストデータを正規化することのメリットの一つは、リスト型コンポーネントのアイテムが更新される際に、リストの親コンポーネントの再レンダリングを防ぐことが可能なことです。

上述の `posts` を正規化することで、親の `<PostsList />` は ids だけを参照すれば良くなり、アイテムの一部の値が更新されても `id` が更新されない限りは再レンダリングされなくなります。

```tsx
const PostExcerpt: React.VFC<{ postId: EntityId }> = ({ postId }) => {
  const post = useTypedSelector((state) => selectPostById(state, postId));

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostsList: React.VFC = () => {
  const dispatch = useTypedDispatch();
  const orderedPostIds = useTypedSelector(selectPostIds);
  const postStatus = useTypedSelector((state) => state.posts.status);
  const error = useTypedSelector((state) => state.posts.error);

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {postStatus === 'loading' ? (
        <Spinner text="loading..." />
      ) : postStatus === 'succeeded' ? (
        orderedPostIds.map((postId) => <PostExcerpt key={postId} postId={postId} />)
      ) : postStatus === 'failed' ? (
        <div>{error}</div>
      ) : null}
    </section>
  );
};
```

### メモ化されたセレクタ関数を useSelector に渡す

`useSelector()` は Action が dispatch されるたびに再実行され、そこで新しい参照値を返すとコンポーネントが再レンダリングされます。

select 関数で配列やオブジェクトが生成される場合は、値の内容が変化していなくても常に新しい参照値となってしまうため、不要な再レンダリングを発生させてしまいます。

例えば、下記の`<UserPage />` で計算されている`postsForUser` は `allPosts.filter()` によって常に新しい参照が返されてしまうので、どこかしらで Action が dispatch される度に、`<UserPage />`は再レンダリングしてしまいます。

```tsx
export const UserPage: React.VFC<Props> = ({ match }) => {
  const { userId } = match.params;

  const user = useTypedSelector((state) => selectUserById(state, userId));

  const postsForUser = useTypedSelector((state) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter((post) => post.user === userId);
  });

  // 省略
};
```

これを解決するためには、メモ化されたセレクタ関数を `useSelector()` に渡す必要があります。
redux-toolkit では、セレクタ関数をメモ化するための `createSelector()` が提供されており、上記の `postsForUser` の セレクタは下記のようにメモ化することができます。

```ts
export const selectPostsByUser = createSelector(
  [selectAllPosts, selector((_, userId: string) => userId)], // input selectors
  (posts, userId) => posts.filter((post) => post.user === userId) // output selector
);
```

`createSelector()` の第一引数は input selectors 配列で、メモ化対象の値を返します。
第二引数は output selector で、input selector の配列が順に引数として渡される関数です。
output selector で return した値がこのセレクタが返す値となります。
こうすることで、`posts` か `userId` のどちらかが変化したときのみ、新しい参照が返されるため、結果として、不要な再レンダリングを防ぐことができます。

上記の`selector((_, userId: string) => userId)` 内の`selector()`は、自分で定義した util 関数です。
TS で純粋なセレクタを記述するときに、第一引数の`RootState`の型を省略できます。

```ts
// src/app/selector.ts
import { RootState } from './store';

type Extras<T extends unknown[]> = T extends [RootState, ...infer Extras] ? Extras : [];

export const selector = <T extends (state: RootState, ...extras: any[]) => unknown>(
  select: T
): T extends (...params: infer Params) => infer Return
  ? (state: Params[0], ...extras: Extras<Params>) => Return
  : never => select as any;
```

## おわりに

Redux Essentials を読むことで、Redux 公式の推奨アプローチや React のレンダリングパフォーマンスの最適化について学ぶことができました。

redux-toolkit を使ったコードは、ボイラープレートなコードをすべて手書きで書いていた頃と比べて、格段に少ない記述量で書くことができます。しかし、非同期処理の扱いは `pending/fulfilled/rejected` パターンを reducer に記述しなければならず、現代の hooks ベースの API（Apollo 等）と比較するとまだ冗長であると感じます。

次回は、Part2 ということで、そこら辺の悩みも解決できる RTK Query についての学びをまとめようと思います。

（ブログ作っただけで終わりにならなくて良かった〜〜〜〜）
