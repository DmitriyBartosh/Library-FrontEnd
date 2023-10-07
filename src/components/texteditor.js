import React, { useState, useRef } from "react";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import cx from "classname";
import StarterKit from "@tiptap/starter-kit";
import {
  BsTypeH1,
  BsTypeH2,
  BsTypeItalic,
  BsTypeBold,
  BsParagraph,
  BsTypeStrikethrough,
  BsListOl,
  BsBlockquoteLeft,
  BsImage,
} from "react-icons/bs";
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import { LuHighlighter } from "react-icons/lu";

import * as styles from "./texteditor.module.scss";

const MenuBar = ({ editor }) => {
  const urlImageRef = useRef(null);
  const [addLink, setAddLink] = useState(false);

  if (!editor) {
    return null;
  }

  const addImage = (url) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
      setAddLink(false);
    }
  };

  return (
    <div className={styles.menu}>
      {addLink && (
        <div className={styles.promt}>
          <div className={styles.content}>
            <p className={styles.hint}>Ссылка на изображение</p>
            <input className={styles.url} type="text" ref={urlImageRef} />
          </div>

          <div className={styles.action}>
            <button
              className={styles.add}
              onClick={() => addImage(urlImageRef.current.value)}
            >
              <p className={styles.text}>Добавить</p>
              <IoCheckmarkSharp className={styles.icon} />
            </button>
            <button className={styles.close} onClick={() => setAddLink(false)}>
              <p className={styles.text}>Скрыть</p>
              <IoCloseSharp className={styles.icon} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cx(
          styles.button,
          editor.isActive("heading", { level: 1 }) && styles.active
        )}
      >
        <p className={styles.text}>Заголовок</p>
        <BsTypeH1 className={styles.icon} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cx(
          styles.button,
          editor.isActive("heading", { level: 2 }) && styles.active
        )}
      >
        <p className={styles.text}>Подзаголовок</p>
        <BsTypeH2 className={styles.icon} />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cx(
          styles.button,
          editor.isActive("paragraph") && styles.active
        )}
      >
        <p className={styles.text}>Параграф</p>
        <BsParagraph className={styles.icon} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cx(
          styles.button,
          editor.isActive("orderedList") && styles.active
        )}
      >
        <p className={styles.text}>Список</p>
        <BsListOl className={styles.icon} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cx(styles.button, editor.isActive("bold") && styles.active)}
      >
        <p className={styles.text}>Жирный</p>
        <BsTypeBold className={styles.icon} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cx(
          styles.button,
          editor.isActive("italic") && styles.active
        )}
      >
        <p className={styles.text}>Курсив</p>
        <BsTypeItalic className={styles.icon} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cx(
          styles.button,
          editor.isActive("strike") && styles.active
        )}
      >
        <p className={styles.text}>Зачеркнутый</p>
        <BsTypeStrikethrough className={styles.icon} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cx(
          styles.button,
          editor.isActive("blockquote") && styles.active
        )}
      >
        <p className={styles.text}>Цитата</p>
        <BsBlockquoteLeft className={styles.icon} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={cx(
          styles.button,
          editor.isActive("highlight") && styles.active
        )}
      >
        <p className={styles.text}>Выделить</p>
        <LuHighlighter className={styles.icon} />
      </button>
      <button className={styles.button} onClick={() => setAddLink(true)}>
        <p className={styles.text}>Картинка</p>
        <BsImage className={styles.icon} />
      </button>
    </div>
  );
};

export default ({ setText, text }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    editorProps: {
      attributes: {
        class: styles.input,
      },
    },
    content: `${text}`,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setText(html);
    },
  });

  return (
    <div className={styles.container}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
};
