import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {FORMAT_TEXT_COMMAND,UNDO_COMMAND,REDO_COMMAND,$getSelection,$createParagraphNode} from "lexical";

import { $setBlocksType } from "@lexical/selection";

import {$createHeadingNode,$createQuoteNode} from "@lexical/rich-text";

import { $createCodeNode } from "@lexical/code";

import {INSERT_ORDERED_LIST_COMMAND,INSERT_UNORDERED_LIST_COMMAND} from "@lexical/list";

import {FaBold,FaItalic,FaUnderline,FaUndo,FaRedo} from "react-icons/fa";

import {MdFormatListBulleted,MdFormatListNumbered} from "react-icons/md";

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const changeBlockType = (type: string) => {
    editor.update(() => {
      const selection = $getSelection();

      if (!selection) return;

      switch (type) {
        case "paragraph":
          $setBlocksType(selection, () => $createParagraphNode());
          break;

        case "h1":
          $setBlocksType(selection, () => $createHeadingNode("h1"));
          break;

        case "h2":
          $setBlocksType(selection, () => $createHeadingNode("h2"));
          break;

        case "h3":
          $setBlocksType(selection, () => $createHeadingNode("h3"));
          break;

        case "quote":
          $setBlocksType(selection, () => $createQuoteNode());
          break;

        case "code":
          $setBlocksType(selection, () => $createCodeNode());
          break;
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b pb-3 mb-4">

      <select
        className="select select-bordered select-sm"
        defaultValue="paragraph"
        onChange={(e) => changeBlockType(e.target.value)}
      >
        <option value="paragraph">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="quote">Quote</option>
        <option value="code">Code Block</option>
      </select>

      <div className="divider divider-horizontal"></div>

      <button
        className="btn btn-sm btn-ghost"
        onClick={() =>
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }
      >
        <FaUndo />
      </button>

      <button
        className="btn btn-sm btn-ghost"
        onClick={() =>
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }
      >
        <FaRedo />
      </button>

      <div className="divider divider-horizontal"></div>
      <button
        className="btn btn-sm btn-ghost"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }
      >
        <FaBold />
      </button>

      <button
        className="btn btn-sm btn-ghost"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }
      >
        <FaItalic />
      </button>

      <button
        className="btn btn-sm btn-ghost"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        }
      >
        <FaUnderline />
      </button>

      <div className="divider divider-horizontal"></div>

      <button
        className="btn btn-sm btn-ghost"
        onClick={() =>
          editor.dispatchCommand(
            INSERT_UNORDERED_LIST_COMMAND,
            undefined
          )
        }
      >
        <MdFormatListBulleted />
      </button>

      <button
        className="btn btn-sm btn-ghost"
        onClick={() =>
          editor.dispatchCommand(
            INSERT_ORDERED_LIST_COMMAND,
            undefined
          )
        }
      >
        <MdFormatListNumbered />
      </button>

    </div>
  );
}

export default Toolbar;