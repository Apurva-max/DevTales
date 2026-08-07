import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";

interface Props {
  onChange: (content: string) => void;
}

function EditorChange({ onChange }: Props) {
  const [editor] = useLexicalComposerContext();

  return (
    <OnChangePlugin
      onChange={() => {
        editor.update(() => {
          const html = $generateHtmlFromNodes(editor);

          console.log("HTML:", html);

          onChange(html);
        });
      }}
    />
  );
}

export default EditorChange;