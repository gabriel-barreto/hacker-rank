'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;
process.stdin.on('data', function (inputStdin: string): void {
  inputString += inputStdin;
});

process.stdin.on('end', function (): void {
  inputLines = inputString.split('\n');
  inputString = '';
  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

class TreeNode {
  public data: number;
  public left?: TreeNode;
  public level: number;
  public right?: TreeNode;

  constructor(data: number) {
    this.data = data;
    this.level = 0;
  }
}

type Height = { right: number; left: number };
type Tree = { height: Height; root?: TreeNode };

type AppendAndGetHeightArgs = {
  height: Height;
  node: TreeNode;
  root?: TreeNode;
};

function getTargetTreeSide({ root, node }: { root: TreeNode; node: TreeNode }) {
  if (root.data > node.data) return 'left';
  return 'right';
}

function appendAndGetHeight({ height, node, root }: AppendAndGetHeightArgs): void {
  if (!root) return;
  const side = getTargetTreeSide({ root, node });
  if (root[side]) return appendAndGetHeight({ height, node, root: root[side] });
  const level = root.level + 1;
  node.level = level;
  height[side] = level;
  root[side] = node;
}

function main() {
  const [, strRawNodes] = inputLines;
  const rawNodes = strRawNodes.split(' ').map((e) => parseInt(e, 10));
  const tree: Tree = { height: { right: 0, left: 0 } };
  for (let nodeData of rawNodes) {
    const node = new TreeNode(nodeData);
    if (!tree.root) {
      tree.root = node;
      continue;
    }
    appendAndGetHeight({ ...tree, node });
  }
  console.log(Math.max(tree.height.left, tree.height.right));
}
