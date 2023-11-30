// ES2015 module syntax
import { Editor, EditorTools } from '@progress/kendo-react-editor';
const {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignRight,
    AlignCenter,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo,
    Link,
    Unlink
    } = EditorTools;

export default function StaticPage() {
    return (
        <Editor tools={[[Bold, Italic, Underline], [Undo, Redo], [Link, Unlink], [AlignLeft, AlignCenter, AlignRight], [OrderedList, UnorderedList, Indent, Outdent]]} contentStyle={{
        height: 320
        }} defaultContent={"<p>Hello, NextJS!</p>"} />
    )
}