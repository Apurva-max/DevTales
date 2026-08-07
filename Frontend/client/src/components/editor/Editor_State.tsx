import { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";

interface Props {
    initialContent: string;
}

function Editor_State({ initialContent }: Props) {
    const [editor] = useLexicalComposerContext();

    const loaded = useRef(false)

    useEffect(() => {
        if(loaded.current) return ;

        if(!initialContent) return ;

        loaded.current = true;
        
        editor.update(() => {
            const root = $getRoot();

            root.clear();

            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(initialContent));
            root.append(paragraph);
        });
    }, [editor, initialContent]);

    return null;
}

export default Editor_State;