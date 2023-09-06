import { useState } from "react";
import NodeModal from "./NodeModal";

import { v4 } from "uuid";
import { Box, Stack } from "@chakra-ui/react";
import { Tree } from 'react-d3-tree';

function bfs(id, tree, node) {
  const queue = [];

  queue.unshift(tree);

  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode.attributes?.id === id) {
      curNode.children.push(node);

      return { ...tree };
    }

    const len = curNode.children.length;

    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i]);
    }
  }
}

export default function Home() {
  const [tree, setTree] = useState({
    name: "Family",
    attributes: {
      id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f",
    },
           children: [],

  });
  const [node, setNode] = useState();

  const close = () => setNode(undefined);

  const handleNodeClick = (datum) => {
    setNode(datum);
  };

  const handleSubmit = (familyMemberName) => {
    const newTree = bfs(node.attributes?.id, tree, {
      name: familyMemberName,
      attributes: {
        id: v4(),
      },
      children: [],
    });

    if (newTree) {
      setTree(newTree);

      localStorage.setItem("tree", JSON.stringify(newTree));
    }

    setNode(undefined);
  };

  const renderRectSvgNode = (customProps, click) => {
    const { nodeDatum } = customProps;

    return (
      <g>
        <circle r="15" fill={"#777"} onClick={() => click(nodeDatum)} />
        <text fill="black" strokeWidth="0.5" x="20" y="-5">
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  return (
    <Stack direction="row" spacing="md">
      <Box w="100%" h="100vh">
        <Tree
          data={tree}
          zoomable={true}
          onNodeClick={handleNodeClick}
          translate={{
            x: 200,
            y: 200,
          }}
          renderCustomNodeElement={(nodeInfo) =>
            renderRectSvgNode(nodeInfo, handleNodeClick)
          }
        />

        <NodeModal
          onSubmit={(familyMemberName) => handleSubmit(familyMemberName)}
          onClose={close}
          isOpen={Boolean(node)}
        />
      </Box>
    </Stack>
  );
}
