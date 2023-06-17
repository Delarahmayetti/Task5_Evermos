// k6 run reqres-performance-test.js

import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
	vus: 1000,
	iterations: 3500,
	thresholds: {
		http_req_duration: ["p(95)<2000"], // Batas maksimum respons API 2 detik
	},
};

export function handleSummary(data) {
	return {
		"report.html": htmlReport(data),
	};
}

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
