import {Constants} from "../constants";
import {pathPosix} from "../util/pathName";
import {getAllModels} from "../layout/getAll";

export const renderAssetsPreview = (pathString: string) => {
    if (!pathString) {
        return "";
    }
    const type = pathPosix().extname(pathString).toLowerCase();
    if (Constants.SIYUAN_ASSETS_IMAGE.includes(type)) {
        return `<img style="max-height: 100%" src="${pathString}">`;
    } else if (Constants.SIYUAN_ASSETS_AUDIO.includes(type)) {
        return `<audio style="max-width: 100%" controls="controls" src="${pathString}"></audio>`;
    } else if (Constants.SIYUAN_ASSETS_VIDEO.includes(type)) {
        return `<video style="max-width: 100%" controls="controls" src="${pathString}"></video>`;
    } else {
        return pathString;
    }
};

export const pdfResize = () => {
    getAllModels().asset.find(item => {
        const pdfInstance = item.pdfObject
        const {pdfDocument, pdfViewer} = pdfInstance
        if (!pdfDocument) {
            return
        }
        const currentScaleValue = pdfViewer.currentScaleValue
        if (
            currentScaleValue === 'auto' ||
            currentScaleValue === 'page-fit' ||
            currentScaleValue === 'page-width'
        ) {
            // Note: the scale is constant for 'page-actual'.
            pdfViewer.currentScaleValue = currentScaleValue
        }
        pdfViewer.update()
    })
}
