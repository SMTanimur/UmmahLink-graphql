
"use client"
import React, { useState } from "react";
import { LightBox } from "../components";
import { convertHttps } from "../data";


interface IProps {
  images: string[];
}

const ImageGrid: React.FC<IProps> = ({ images }) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
   // Transform urls to https
   const httpsImages = images.map(img => convertHttps(img));

  const onClickImage = (e: any) => {
    if (e.target.dataset) {
      const idx = e.target.dataset.index;
       setExpandedImage(idx)
    }
  }



  const renderGrid = () => {
    switch (images.length) {
      case 1:
        return `
                    <div class="custom-grid">
                        <img src=${httpsImages[0]} class="grid-img" data-index="0"/>
                    </div>
                `
      case 2:
        return `
                    <div class="custom-grid custom-grid-rows-2">
                        <img src=${httpsImages[0]} class="grid-img" data-index="0"/>
                        <img src=${httpsImages[1]} class="grid-img" data-index="1"/>
                    </div>
                `
      case 3:
        return `
                    <div class="custom-grid custom-grid-rows-2">
                        <div class="custom-grid">
                            <img src=${httpsImages[0]} class="grid-img" data-index="0"/>
                        </div>
                        <div class="custom-grid custom-grid-cols-2">
                            <img src=${httpsImages[1]} class="grid-img" data-index="1"/>
                            <img src=${httpsImages[2]} class="grid-img" data-index="2"/>
                        </div>
                    </div>
                `
      case 4:
        return `
                    <div class="custom-grid custom-grid-rows-2">
                        <div class="custom-grid custom-grid-cols-2">
                            <img src=${httpsImages[0]} class="grid-img" data-index="0"/>
                            <img src=${httpsImages[1]} class="grid-img" data-index="1"/>
                        </div>
                        <div class="custom-grid custom-grid-cols-2">
                            <img src=${httpsImages[2]} class="grid-img" data-index="2"/>
                            <img src=${httpsImages[3]} class="grid-img" data-index="3"/>
                        </div>
                    </div>
                `
      case 5:
        return `
                    <div class="custom-grid custom-grid-rows-2">
                        <div class="custom-grid custom-grid-cols-2">
                            <img src=${httpsImages[0]} class="grid-img" data-index="0" />
                            <img src=${httpsImages[1]} class="grid-img" data-index="1" />
                        </div>
                        <div class="custom-grid custom-grid-cols-3">
                            <img src=${httpsImages[2]} class="grid-img" data-index="2" />
                            <img src=${httpsImages[3]} class="grid-img" data-index="3" />
                            <img src=${httpsImages[4]} class="grid-img" data-index="4" />
                        </div>
                    </div>
                `
      default:
        return `
                    <div class="custom-grid-items custom-grid-items-2">
                        <img src=${httpsImages[0]} class="grid-img"/>
                    </div>
                `
    }
  }
  return (
    <>
      <div
        className="w-full h-25rem overflow-hidden"
        dangerouslySetInnerHTML={{ __html: renderGrid() }}
        onClick={onClickImage}
      >

      </div>
      <LightBox
          show={Boolean(expandedImage)}
          url={expandedImage}
          onClose={() => setExpandedImage(null)}
        />
    </>
  )
};

export default ImageGrid;
