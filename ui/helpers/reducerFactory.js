export default function reducerFactory({
  queryReducer = data => data,
  mutationReducer = data => data,
}) {
  return (prevResults, action, variables) => {
    let newResults = prevResults;

    switch (action.type) {
      case 'APOLLO_MUTATION_RESULT':
        newResults = mutationReducer(prevResults, action, variables);
        break;
      case 'APOLLO_QUERY_RESULT':
        newResults = queryReducer(prevResults, action, variables);
        break;
      default:

    }

    return newResults;
  };
}
