var gql = require("graphql-tag");
var ApolloClient = require("apollo-client").default;
var createNetworkInterface = require("apollo-client").createNetworkInterface;
var networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cjgqy7jv969ux01033ys92hzp"
});
var client = new ApolloClient({ networkInterface: networkInterface });

const Api = {
  getAllData: () => {
    return client
      .query({
        query: gql`
          query Data {
            allDatas {
              key
              content
              title
              image
            }
          }
        `
      })
      .then(data => {
        // console.log("DATA", data.data.allDatas);
        // this.setState({
        //   items: data.data.allDatas
        // });
        return data.data.allDatas;
      })
      .catch(error => console.error(error));
  },
  getDataByKey: key => {
    return client
      .query({
        query: gql`
          query DataFilter($key: String!) {
            allDatas(filter: { key: $key }) {
              key
              content
              title
              image
            }
          }
        `,
        variables: {
          key: key
        }
      })
      .then(data => {
        return data.data.allDatas[0];
      })
      .catch(error => console.error(error));
  }
};

export default Api;
