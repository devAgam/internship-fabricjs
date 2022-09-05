import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

export default function Draw() {
  const { editor, onReady } = useFabricJSEditor();
  const [removedItems, setremovedItems] = useState<any>([]);
  const getSavedData = async () => {
    const data = await fetch("/api");
    const res = await data.json();
    //  load the saved data
    editor?.canvas.loadFromJSON(res.json, () => {
      editor?.canvas.renderAll();
    });
  };

  useEffect(() => {
    if (editor) {
      editor.canvas.isDrawingMode = true;
      getSavedData();
    }
  }, [editor]);
  // function to clear, undo, redo, save canvas
  const clearCanvas = () => {
    if (editor) {
      editor.canvas.clear();
    }
  };

  const undo = () => {
    if (editor && editor.canvas._objects.length > 0) {
      setremovedItems([
        ...removedItems,
        editor.canvas.item(editor.canvas.getObjects().length - 1),
      ]);
      editor.canvas.remove(
        editor.canvas.item(editor.canvas.getObjects().length - 1) as any
      );
    }
  };

  const redo = () => {
    if (editor && removedItems.length > 0) {
      editor.canvas.add(removedItems[removedItems.length - 1]);
      setremovedItems(removedItems.slice(0, removedItems.length - 1));
    }
  };

  const saveCanvas = () => {
    if (editor) {
      const data = editor.canvas.toDataURL({
        format: "png",
        multiplier: 4,
      });
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = data;
      link.click();
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const dumpCanvas = async () => {
    setIsLoading(true);
    if (editor) {
      const data = editor.canvas.toJSON();
      console.log(data);
      const res = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ json: data }),
      });
      const resData = await res.json();
      if (resData.success) {
        alert("saved");
      }
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={saveCanvas}>Save</button>
        <button onClick={dumpCanvas}>Cloud</button>
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <FabricJSCanvas onReady={onReady} />
      </div>
    </div>
  );
}
