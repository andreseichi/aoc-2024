class BinaryTreeNode {
  key: number;
  value: number;
  parent: BinaryTreeNode | null;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
  constructor(key: number, value = key, prante: BinaryTreeNode | null = null) {
    this.key = key;
    this.value = value;
    this.parent = prante;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  root: BinaryTreeNode;
  constructor(key: number, value = key) {
    this.root = new BinaryTreeNode(key, value);
  }

  *inOrderTraversal(
    node: BinaryTreeNode = this.root,
  ): Generator<BinaryTreeNode> {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  *postOrderTraversal(
    node: BinaryTreeNode = this.root,
  ): Generator<BinaryTreeNode> {
    if (node.left) yield* this.postOrderTraversal(node.left);
    if (node.right) yield* this.postOrderTraversal(node.right);
    yield node;
  }

  *preOrderTraversal(
    node: BinaryTreeNode = this.root,
  ): Generator<BinaryTreeNode> {
    yield node;
    if (node.left) yield* this.preOrderTraversal(node.left);
    if (node.right) yield* this.preOrderTraversal(node.right);
  }

  insert(
    parentNodeKey: any,
    key: number,
    value = key,
    { left, right } = { left: true, right: true },
  ) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        const canInsertLeft = left && node.left === null;
        const canInsertRight = right && node.right === null;
        if (!canInsertLeft && !canInsertRight) return false;
        if (canInsertLeft) {
          node.left = new BinaryTreeNode(key, value, node);
        }
        if (canInsertRight) {
          node.right = new BinaryTreeNode(key, value, node);
        }
      }
    }
    return false;
  }

  remove(key: any) {
    for (let node of this.preOrderTraversal()) {
      if (node.left?.key === key) {
        node.left = null;
        return true;
      }
      if (node.right?.key === key) {
        node.right = null;
        return true;
      }
    }
    return false;
  }

  find(key: any) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}
