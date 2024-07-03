import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
  Store,
} from "redux";
import { persistReducer, persistStore, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import { PersistConfig } from "redux-persist/es/types";
import rootReducer from "./rootReducer";

const middleware: any[] = [thunk];
const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

interface RootState {}

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer<RootState>(
  persistConfig,
  async function name(params: any) {
    rootReducer;
  }
);

export const store: Store<RootState> = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middleware))
);

export const persistor: Persistor = persistStore(store);
