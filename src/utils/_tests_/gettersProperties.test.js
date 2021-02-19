import {settingsText} from "../../test/mock/fields-data/organism.model.config";
import {getContentProps} from "../gettersProperties";

const mockField = {
    responsiveSettings: ['M', 'T', 'D'],
    content: {
        html: {
            0: "<p>this is a parapgraph</p>"
        }
    },
    settings: settingsText.defaultValue
}

describe('gettersProperties - getContentProps - ', ()  => {
    it('should return object with responsive, basis and  typography properties when properties of field are complete', () => {
        const result = getContentProps(mockField);

        expect(result).toEqual({
            responsive: mockField.responsiveSettings,
            typography:  mockField.settings.typography,
            basis:  mockField.settings.basis
        });
    });
})