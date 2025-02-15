/**
 * The persister-yjs module of the TinyBase project provides a way to save and
 * load Store data, to and from a Yjs document.
 *
 * A single entry point, the createYjsPersister function, is provided, which
 * returns a new Persister object that can bind a Store to a provided Yjs
 * document.
 * @see Synchronizing Data guide
 * @packageDocumentation
 * @module persister-yjs
 * @since v4.0.0
 */
/// persister-yjs
/**
 * The createYjsPersister function creates a Persister object that can persist
 * the Store to a Yjs document.
 *
 * As well as providing a reference to the Store to persist, you must provide
 * the Yjs document to persist it to.
 * @param store The Store to persist.
 * @param yDoc The Yjs document to persist the Store to.
 * @param yMapName The name of the Y.Map used inside the Yjs document to sync
 * the Store to (which otherwise will default to 'tinybase').
 * @returns A reference to the new Persister object.
 * @example
 * This example creates a Persister object and persists the Store to a Yjs
 * document.
 *
 * ```js
 * const doc = new Y.Doc();
 * const store = createStore().setTables({pets: {fido: {species: 'dog'}}});
 * const persister = createYjsPersister(store, doc);
 *
 * await persister.save();
 * // Store will be saved to the document.
 *
 * console.log(doc.toJSON());
 * // -> {tinybase: {t: {pets: {fido: {species: 'dog'}}}, v: {}}}
 *
 * persister.destroy();
 * ```
 * @example
 * This more complex example uses Yjs updates to keep two Store objects (each
 * with their own Persister objects and Yjs documents) in sync with each other.
 * We use the `await` keyword extensively for the purpose of ensuring
 * sequentiality in this example.
 *
 * Typically, real-world synchronization would happen between two systems via a
 * Yjs connection provider. Here, we synthesize that with the `syncDocs`
 * function.
 *
 * ```js
 * const doc1 = new Y.Doc();
 * const doc2 = new Y.Doc();
 *
 * // A function to manually synchronize documents with each other. Typically
 * // this would happen over the wire, via a Yjs connection provider.
 * const syncDocs = async () => {
 *   Y.applyUpdate(doc1, Y.encodeStateAsUpdate(doc2));
 *   Y.applyUpdate(doc2, Y.encodeStateAsUpdate(doc1));
 * };
 *
 * // Bind a persisted Store to each document.
 * const store1 = createStore();
 * const persister1 = createYjsPersister(store1, doc1);
 * await persister1.startAutoLoad();
 * await persister1.startAutoSave();
 *
 * const store2 = createStore();
 * const persister2 = createYjsPersister(store2, doc2);
 * await persister2.startAutoLoad();
 * await persister2.startAutoSave();
 *
 * // Synchronize the documents in their initial state.
 * await syncDocs();
 *
 * // Make a change to each of the two Stores.
 * store1.setTables({pets: {fido: {species: 'dog'}}});
 * store2.setValues({open: true});
 * // ...
 *
 * // Synchronize the documents with each other again.
 * await syncDocs();
 *
 * // Ensure the Stores are in sync.
 * console.log(store1.getContent());
 * // -> [{pets: {fido: {species: 'dog'}}}, {open: true}]
 * console.log(store2.getContent());
 * // -> [{pets: {fido: {species: 'dog'}}}, {open: true}]
 *
 * persister1.destroy();
 * persister2.destroy();
 * ```
 * @category Creation
 * @since v4.0.0
 */
/// createYjsPersister
