/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	Executable,
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	const server: Executable = {
		command: `/Users/zaen/Projects/Projects/weasel-lang/weasel-lsp/build/examples/example`,
		args: ['-logs', "test.log"],
		options: { shell: true, detached: true },
		transport: TransportKind.stdio
	};

	const serverOptions: ServerOptions = server;

	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'weasel' }],
	};

	const client = new LanguageClient('Weasel Language Server', serverOptions, clientOptions);
	console.log('Weasel Language Server is now active!');
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
