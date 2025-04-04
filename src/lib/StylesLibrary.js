import Rock from "./Rock.js"
import Jazz from "./Jazz.js"
import Funk from "./Funk.js"
import Blues from "./Blues.js"


class StylesLibrary {

    static #styles = new Map([

        ['Rock', Rock],
        ['Funk', Funk],
        ['Jazz', Jazz],
        ['Blues', Blues],
    ])

    /**
     * 
     * @param {*} style 
     * @returns 
     */
    static getStyleRef(style) {

        return this.#styles.get(style);
    }

    static getAllStyles() {
        return Array.from(this.#styles.keys());
    }

    /*
    static getBassArrayByDrums(theStyle, drums) {

        const style = StylesLibrary.getStyleRef(theStyle);

        const drumsToBassMap = style.getDrumsToBassMap();

        return drumsToBassMap.get(drums)
    } 
        */

    static getDrumsKeys(theStyle) {

        const style = StylesLibrary.getStyleRef(theStyle);

        const drumsMap = style.getDrumsMap();

        return Array.from(drumsMap.keys());
    }

    static getBassKeys(theStyle) {

        const style = StylesLibrary.getStyleRef(theStyle);

        const bassMap = style.getBassMap();

        return Array.from(bassMap.keys());
    }

    static getBass(theStyle, bass) {

        // console.log(`theStyle ${theStyle} theBass ${bass}`)

        const style = StylesLibrary.getStyleRef(theStyle);

        const bassMap = style.getBassMap()

        return bassMap.get(bass)
    }

    static getDrums(theStyle, drums) {


        const style = StylesLibrary.getStyleRef(theStyle);

        const drumsMap = style.getDrumsMap()

        return drumsMap.get(drums)
    }
}


export default StylesLibrary;