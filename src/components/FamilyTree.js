import React from 'react';
import Tree from 'react-d3-tree';

function FamilyTree({ data }) {
  // Define your initial tree data
  const initialTreeData = {
    name: 'Root',
    children: data,
  };

  // Function to add a parent to a different subchild
  const addParentToSubchild = (treeData, newParentName, subchildName) => {
    // Find the subchild node to which you want to add a parent
    const findSubchild = (node) => {
      if (node.name === subchildName) {
        return true;
      } else if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          if (findSubchild(node.children[i])) {
            return true;
          }
        }
      }
      return false;
    };

    // Recursively traverse the tree and add the new parent to the subchild
    const addParent = (node) => {
      if (node.name === newParentName) {
        // Add the subchild to the new parent's children
        node.children = [...(node.children || []), { name: subchildName }];
      } else if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          addParent(node.children[i]);
        }
      }
    };

    // Make a copy of the tree data to avoid mutating the original
    const newTreeData = { ...treeData };

    // Find and add the parent to the subchild
    if (findSubchild(newTreeData)) {
      addParent(newTreeData);
    }

    return newTreeData;
  };

  // Add a new parent to a different subchild
  const treeDataWithNewParent = addParentToSubchild(initialTreeData, 'NewParent', 'SubchildName');

  return (
    <div className="family-tree">
      <Tree
        data={treeDataWithNewParent}
        orientation="vertical"
        collapsible={false}
        translate={{ x: 300, y: 50 }}
        zoom={0.6}
      />
    </div>
  );
}

export default FamilyTree;
