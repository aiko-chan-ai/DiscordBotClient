/* Copyright Elysia © 2025. All rights reserved */

// Originally from Discord.js

import { GatewayIntentBits } from "discord-api-types/v10";

import { BitField } from "./BitField";

/**
 * Data structure that makes it easy to calculate intents.
 *
 * @extends {BitField}
 */
export class IntentsBitField extends BitField {
    /**
     * Numeric WebSocket intents
     *
     * @type {GatewayIntentBits}
     * @memberof IntentsBitField
     */
    static Flags = GatewayIntentBits;

    static getIntents (...removeIntents: GatewayIntentBits[]): number {
        const allIntents = Object.values(GatewayIntentBits).filter(v => typeof v === "number") as number[];
        let intents = allIntents.reduce((acc, bit) => acc | bit, 0);
        for (const remove of removeIntents) {
            intents &= ~remove;
        }
        return intents;
    }
}

/**
 * @name IntentsBitField
 * @kind constructor
 * @memberof IntentsBitField
 * @param {IntentsResolvable} [bits=0] Bit(s) to read from
 */

/**
 * Data that can be resolved to give a permission number. This can be:
 * - A string (see {@link IntentsBitField.Flags})
 * - An intents flag
 * - An instance of {@link IntentsBitField}
 * - An array of IntentsResolvable
 *
 * @typedef {string|number|IntentsBitField|IntentsResolvable[]} IntentsResolvable
 */
