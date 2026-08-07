import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import Toolbar from "./Toolbar"
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import EditorTheme from "./Theme";
import EditorChange from "./EditorChange";
import Editor_State from "./Editor_State";


interface LexicalEditorProps {
  onChange : (content: string) => void;
  initialContent?: string;
}

const editorConfig = {namespace: "DevTales",theme: EditorTheme,onError(error: Error) {throw error;},
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    CodeNode,
    CodeHighlightNode,
    LinkNode,
  ],
};

function LexicalEditor({
  onChange,
  initialContent = "",
}: LexicalEditorProps) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border rounded-xl p-4">

        <Toolbar />

        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[300px] outline-none mt-4" />
          }
          placeholder={
            <div className="text-gray-400">
              Start writing your blog...
            </div>
          }
          ErrorBoundary={() => null}
        />

        <HistoryPlugin />
        <ListPlugin />

        <Editor_State initialContent={initialContent} />

        <EditorChange onChange={onChange} />

      </div>
    </LexicalComposer>
  );
}

export default LexicalEditor;