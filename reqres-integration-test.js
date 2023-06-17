// k6 run reqres-integration-test.js

import http from "k6/http";
import { sleep, check } from "k6";

export default function () {
	// Endpoint untuk membuat sumber daya baru
	let createResource = http.post(
		"https://reqres.in/api/users",
		JSON.stringify({
			name: "morpheus",
			job: "leader",
		}),
		{ headers: { "Content-Type": "application/json" } }
	);
	// Aserasi untuk Create API
	check(createResource, { "Status is 201": (r) => r.status === 201 });

	// Endpoint untuk memperbarui sumber daya
	let updateResource = http.put(
		"https://reqres.in/api/users/2",
		JSON.stringify({
			name: "morpheus",
			job: "zion resident",
		}),
		{ headers: { "Content-Type": "application/json" } }
	);

	// Aserasi untuk Update API
	check(updateResource, { "Status is 200": (r) => r.status === 200 });

	sleep(1);
}
