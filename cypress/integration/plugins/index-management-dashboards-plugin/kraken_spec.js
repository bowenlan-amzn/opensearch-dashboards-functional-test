/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { BASE_PATH } from '../../../utils/constants';
import { IM_PLUGIN_NAME } from "../../../utils/constants";

const index_name = "index_1";

describe("Kraken", () => {
    beforeEach(() => {
        cy.visit(`${BASE_PATH}/app/${IM_PLUGIN_NAME}#/hot-indices`);

        cy.contains("Rows per page");
    });

    describe("move to cold", () => {
        before(() => {
            cy.deleteAllIndices();
            cy.createIndex(`${index_name}`);
            cy.wait(5_000);
            cy.request({
                method: 'POST',
                url: `${Cypress.env('openSearchUrl')}/_ultrawarm/migration/${index_name}/_warm`,
                headers: {
                    'osd-xsrf': true
                }
            })
        });

        it("See warm index", () => {
            cy.visit(`${BASE_PATH}/app/${IM_PLUGIN_NAME}#/warm-indices`);
            cy.contains(`${index_name}`);
        });
    });
});