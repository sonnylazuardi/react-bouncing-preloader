import React, { Component } from "react";
import "./App.css";
import BouncingPreloader from "react-bouncing-preloader";

import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import { POINT_CONVERSION_COMPRESSED } from "constants";
var QRCode = require("qrcode.react");
var gql = require("graphql-tag");
var ApolloClient = require("apollo-client").default;
var createNetworkInterface = require("apollo-client").createNetworkInterface;
var networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cjgqy7jv969ux01033ys92hzp"
});
var client = new ApolloClient({ networkInterface: networkInterface });

// import Hat from "./images/kolektorkecebong.png";
// import Banana from "./images/banana.png";
// import Youtube from "./images/youtube.png";
// import Kaesang from "./images/kaesang.png";
// import Camera from "./images/camera.png";
const Thanos =
  "https://github.com/sonnylazuardi/react-bouncing-preloader/raw/master/example/src/images/thanos.png";
const Gauntlet =
  "https://github.com/sonnylazuardi/react-bouncing-preloader/raw/master/example/src/images/gauntlet.png";

const SortableItem = SortableElement(({ icon, sortIndex, onDelete }) => {
  return (
    <div style={styles.sortableItem}>
      <div
        key={icon + sortIndex}
        style={{
          width: 60,
          height: 60,
          background: `url('${icon}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "contain"
        }}
      />
      <button
        href="#"
        style={styles.sortableBtn}
        onClick={() => {
          onDelete(sortIndex);
        }}
      >
        🗑️
      </button>
    </div>
  );
});

const SortableList = SortableContainer(({ items, onDelete }) => {
  return (
    <div className="iconsGrid">
      {items.map((icon, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          sortIndex={index}
          icon={icon}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});

class App extends Component {
  state = {
    icons: [Thanos, Gauntlet],
    speed: 1200,
    size: 100,
    index: 0,
    leftDistance: -150,
    rightDistance: -100,
    leftRotation: -680,
    rightRotation: 360,
    color: "#fff",
    showShare: false,
    title: "Bouncing Preloader Editor"
  };
  alphanumeric_unique() {
    return Math.random()
      .toString(36)
      .split("")
      .filter(function(value, index, self) {
        return self.indexOf(value) === index;
      })
      .join("")
      .substr(2, 8);
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      icons: arrayMove(this.state.icons, oldIndex, newIndex),
      index: this.state.index + 1
    });
  };
  onDelete = index => {
    this.setState({
      icons: this.state.icons.filter((icon, i) => i != index),
      index: this.state.index + 1
    });
  };
  onAddIcon() {
    const url = prompt("Input image url");
    if (url) {
      this.setState({
        icons: [...this.state.icons, url]
      });
    }
  }
  onShowShare() {
    this.setState({
      showShare: true
    });
  }
  onHideShare() {
    this.setState({
      showShare: false
    });
  }
  onSaveData() {
    const uniqueKey = this.alphanumeric_unique();

    const title = prompt("Input Title");
    if (title) {
      this.setState(
        {
          title
        },
        () => {
          const content = JSON.stringify(this.state);
          const image = this.state.icons[0];
          client
            .mutate({
              mutation: gql`
                mutation(
                  $key: String!
                  $content: String!
                  $title: String
                  $image: String
                ) {
                  createData(
                    key: $key
                    content: $content
                    title: $title
                    image: $image
                  ) {
                    id
                    key
                    title
                    image
                  }
                }
              `,
              variables: {
                key: uniqueKey,
                content,
                title,
                image
              }
            })
            .then(data => {
              console.log("data", data);
              window.location.href = "?" + data.data.createData.key;
            })
            .catch(error => {
              console.log(error);
            });
        }
      );
    }
  }
  componentDidMount() {
    let querystring = window.location.search.substring(1);

    if (querystring) {
      client
        .query({
          query: gql`
            query Data($key: String!) {
              allDatas(filter: { key: $key }) {
                key
                content
              }
            }
          `,
          variables: {
            key: querystring
          }
        })
        .then(data => {
          if (!data.data.allDatas[0]) return;
          this.setState(JSON.parse(data.data.allDatas[0].content));
        })
        .catch(error => console.error(error));
    }
  }
  render() {
    const {
      icons,
      index,
      size,
      speed,
      leftDistance,
      rightDistance,
      leftRotation,
      rightRotation,
      showShare,
      title
    } = this.state;
    const querystring = window.location.search.substring(1);
    return (
      <div style={styles.wrapper}>
        <div className="preview">
          <BouncingPreloader
            key={index}
            icons={icons}
            size={size}
            speed={speed}
            leftRotation={`${leftRotation}deg`}
            rightRotation={`${rightRotation}deg`}
            leftDistance={leftDistance}
            rightDistance={rightDistance}
          />
        </div>
        <div className="control">
          <h2>{title}</h2>
          <div style={{ marginBottom: 10 }}>
            💡 Icons{" "}
            <button
              href="#"
              style={styles.btnAdd}
              onClick={() => this.onAddIcon()}
            >
              ➕
            </button>
          </div>
          <SortableList
            axis={"xy"}
            items={icons}
            onSortEnd={this.onSortEnd}
            onDelete={this.onDelete}
          />
          <div style={styles.row}>
            <div style={styles.flexRow}>
              🔍 Size
              <input
                type="number"
                value={size}
                onChange={e =>
                  this.setState({
                    size: e.target.value && parseInt(e.target.value)
                  })
                }
                style={styles.input}
              />
            </div>
            <div style={styles.flexRow}>
              ⚡ Speed
              <input
                type="number"
                value={speed}
                onChange={e =>
                  this.setState({
                    speed: e.target.value && parseInt(e.target.value)
                  })
                }
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.flexRow}>
              L Distance{" "}
              <input
                type="number"
                value={leftDistance}
                onChange={e =>
                  this.setState({
                    leftDistance: e.target.value && parseInt(e.target.value)
                  })
                }
                style={styles.input}
              />
            </div>
            <div style={styles.flexRow}>
              R Distance
              <input
                type="number"
                value={rightDistance}
                onChange={e =>
                  this.setState({
                    rightDistance: e.target.value && parseInt(e.target.value)
                  })
                }
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.row}>
            <div style={styles.flexRow}>
              L Rotation{" "}
              <input
                type="number"
                value={leftRotation}
                onChange={e =>
                  this.setState({
                    leftRotation: e.target.value && parseInt(e.target.value)
                  })
                }
                style={styles.input}
              />
            </div>
            <div style={styles.flexRow}>
              R Rotation
              <input
                type="number"
                value={rightRotation}
                onChange={e =>
                  this.setState({
                    rightRotation: e.target.value && parseInt(e.target.value)
                  })
                }
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.row}>
            <button style={styles.btnSave} onClick={() => this.onSaveData()}>
              Save
            </button>
            {querystring ? (
              <button style={styles.btnSave} onClick={() => this.onShowShare()}>
                Share
              </button>
            ) : null}
          </div>
        </div>
        {showShare ? (
          <div style={styles.share}>
            <button
              href="#"
              style={styles.btnClose}
              onClick={() => this.onHideShare()}
            >
              x
            </button>
            <QRCode value={querystring} />
          </div>
        ) : null}
      </div>
    );
  }
}

const styles = {
  row: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    width: 340
  },
  wrapper: {
    flex: 1,
    padding: 20,
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  flexRow: {
    flex: 1,
    flexDirection: "row"
  },
  input: {
    height: 20,
    borderRadius: 4,
    marginLeft: 10,
    width: 50,
    border: 0,
    padding: 8,
    backgroundColor: "#fff",
    border: "1px solid #ddd"
  },
  sortableItem: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    border: "2px solid #ddd",
    borderStyle: "dotted",
    position: "relative",
    cursor: "pointer"
  },
  sortableBtn: {
    width: 30,
    height: 30,
    backgoundColor: "#eee",
    borderRadius: 15,
    paddingLeft: 9,
    position: "absolute",
    bottom: 2,
    right: 2,
    cursor: "pointer"
  },
  btnAdd: {
    width: 30,
    height: 30,
    backgoundColor: "#eee",
    borderRadius: 15,
    paddingLeft: 8,
    marginLeft: 10,
    cursor: "pointer"
  },
  btnClose: {
    width: 30,
    height: 30,
    backgoundColor: "#eee",
    borderRadius: 15,
    paddingLeft: 8,
    position: "absolute",
    right: 20,
    top: 20,
    cursor: "pointer"
  },
  btnSave: {
    backgoundColor: "#eee",
    borderRadius: 15,
    padding: "10px 15px",
    cursor: "pointer",
    marginRight: 15
  },
  share: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  }
};

export default App;
