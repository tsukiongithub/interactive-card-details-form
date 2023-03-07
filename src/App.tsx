import { type FormEvent, useState } from "react";

import cardBack from "./assets/bg-card-back.png";
import cardFront from "./assets/bg-card-front.png";
import cardLogo from "./assets/card-logo.svg";
import formCompletedGraphic from "./assets/icon-complete.svg";

const nameRegex =
	/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçæčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

const App = () => {
	const [cardholder, setCardholder] = useState<string>("");
	const [cardNumber, setCardNumber] = useState<string>("");
	const [expMonth, setExpMonth] = useState<string>("");
	const [expYear, setExpYear] = useState<string>("");
	const [cvc, setCvc] = useState<string>("");

	const [formCompleted, setFormCompleted] = useState(false);

	const handleSubmit = (ev: FormEvent) => {
		console.log(ev);
		ev.preventDefault();

		setFormCompleted(true);
		console.log("submitted card info");
	};

	const handleResetForm = () => {
		setCardholder("");
		setCardNumber("");
		setExpMonth("");
		setExpYear("");
		setCvc("");

		setFormCompleted(false);
	};

	return (
		<>
			<div className="flex flex-col lg:flex-row">
				<div
					className={`relative mb-32 h-56 bg-[url(./assets/bg-main-mobile.png)] bg-cover lg:mb-0 lg:h-screen lg:max-w-[33.33%] lg:grow lg:bg-[url(./assets/bg-main-desktop.png)]`}
				>
					<div className="lg:absolute lg:top-1/2 lg:w-full">
						<div className="absolute top-8 right-4 drop-shadow-lg xs:right-auto xs:left-28 lg:-right-[40%] lg:top-8 lg:left-auto lg:drop-shadow-2xl">
							<img
								className="w-72 lg:w-96"
								src={cardBack}
								alt="credit card back"
							/>
							<div className="absolute top-[4.25rem] right-8 text-end font-['Roboto_Mono'] text-sm text-white lg:right-10 lg:top-[5.5rem] lg:text-lg">
								{cvc || "000"}
							</div>
						</div>
						<div className="absolute top-32 left-4 drop-shadow-lg lg:left-auto lg:-right-1/4 lg:top-auto lg:bottom-8 lg:drop-shadow-2xl">
							<img
								className="w-72 lg:w-96"
								src={cardFront}
								alt="credit card front"
							/>
							<img
								className="absolute top-4 left-4 h-10 lg:top-6 lg:left-6"
								src={cardLogo}
								alt="credit card logo"
							/>
							<div className="absolute left-4 bottom-12 flex justify-between font-['Roboto_Mono'] text-xl font-normal text-white [letter-spacing:2px] lg:left-6 lg:bottom-14 lg:text-2xl">
								{cardNumber
									.padEnd(16, "0")
									.match(/.{1,4}/gm)
									?.join(" ") || "0000 0000 0000 0000"}
							</div>
							<div className="absolute bottom-4 left-4 max-w-[12rem] text-xs uppercase text-white lg:bottom-5 lg:left-6">
								{cardholder || "Jane Appleseed"}
							</div>
							<div className="absolute bottom-4 right-4 font-['Roboto_Mono'] text-xs text-white lg:bottom-5 lg:right-6">
								{`${expMonth || "00"}/${expYear || "00"}`}
							</div>
						</div>
					</div>
				</div>
				<div className="lg:grid lg:w-2/3 lg:place-content-center">
					<div className="lg:ml-12 lg:max-w-sm">
						{formCompleted ? (
							<div className="flex flex-col items-center px-8">
								<img
									className="mb-8"
									src={formCompletedGraphic}
									alt="checkmark in gradient circle"
								/>
								<h1 className="mb-4 text-2xl uppercase">
									Thank you!
								</h1>
								<p className="mb-12 text-primary-300">
									We've added your card details
								</p>
								<button
									className="btn-primary w-full"
									onClick={handleResetForm}
								>
									Continue
								</button>
							</div>
						) : (
							<form
								className="flex flex-col gap-6 px-8"
								onSubmit={handleSubmit}
							>
								<div>
									<label
										className="text-xs uppercase xs:text-sm"
										htmlFor="cardholderInput"
									>
										Cardholder name
									</label>
									<div className="relative">
										<div className="rounded-md bg-primary-100 from-lg-from to-lg-to p-px focus-within:bg-gradient-to-r">
											<input
												className="w-full rounded-[5px] py-1 px-2 focus:outline-none"
												type="text"
												id="cardholderInput"
												required
												value={cardholder}
												onChange={(ev) => {
													const value =
														ev.target.value;
													if (
														nameRegex.test(value) ||
														value === ""
													) {
														setCardholder(value);
													}
												}}
												onInvalid={(ev) => {
													ev.preventDefault();
												}}
												placeholder="e.g. Jane Appleseed"
												maxLength={30}
											/>
										</div>
									</div>
								</div>
								<div className="relative">
									<label
										className="text-xs uppercase xs:text-sm"
										htmlFor="cardNumberInput"
									>
										Card number
									</label>
									<div className="relative">
										<div className="rounded-md bg-primary-100 from-lg-from to-lg-to p-px focus-within:bg-gradient-to-r">
											<input
												className="w-full rounded-[5px] py-1 px-2 focus:outline-none"
												type="text"
												id="cardNumberInput"
												required
												value={
													cardNumber !== ""
														? cardNumber
																.match(
																	/.{1,4}/gm
																)
																?.join(" ")
														: ""
												}
												onChange={(ev) => {
													const value =
														ev.target.value.replace(
															/\D/gm,
															""
														);
													setCardNumber(value);
												}}
												onInvalid={(ev) => {
													ev.preventDefault();
												}}
												placeholder="e.g. 1234 5678 9123 0000"
												maxLength={19}
											/>
										</div>
									</div>
								</div>
								<div className="flex gap-2">
									<div className="w-fit">
										<label className="text-xs uppercase xs:text-sm">
											Exp. date (mm/yy)
										</label>
										<div className="flex gap-2">
											<div className="relative">
												<div className="rounded-md bg-primary-100 from-lg-from to-lg-to p-px focus-within:bg-gradient-to-r">
													<input
														className="w-full rounded-[5px] py-1 px-2 focus:outline-none"
														type="tel"
														id="expMonthInput"
														required
														value={expMonth}
														onChange={(ev) => {
															const value =
																ev.target.value.replace(
																	/\D/gm,
																	""
																);
															setExpMonth(value);
														}}
														onInvalid={(ev) => {
															ev.preventDefault();
														}}
														placeholder="MM"
														maxLength={2}
													/>
												</div>
											</div>
											<div className="relative">
												<div className="rounded-md bg-primary-100 from-lg-from to-lg-to p-px focus-within:bg-gradient-to-r">
													<input
														className="w-full rounded-[5px] py-1 px-2 focus:outline-none"
														type="tel"
														id="expYearInput"
														required
														value={expYear}
														onChange={(ev) => {
															const value =
																ev.target.value.replace(
																	/\D/gm,
																	""
																);
															setExpYear(value);
														}}
														onInvalid={(ev) => {
															ev.preventDefault();
														}}
														placeholder="YY"
														maxLength={2}
													/>
												</div>
											</div>
										</div>
									</div>
									<div>
										<label
											className="text-xs uppercase xs:text-sm"
											htmlFor="CVCInput"
										>
											CVC
										</label>
										<div className="relative">
											<div className="rounded-md bg-primary-100 from-lg-from to-lg-to p-px focus-within:bg-gradient-to-r">
												<input
													className="w-full rounded-[5px] py-1 px-2 focus:outline-none"
													type="tel"
													id="CVCInput"
													required
													value={cvc}
													onChange={(ev) => {
														const value =
															ev.target.value.replace(
																/\D/gm,
																""
															);
														setCvc(value);
													}}
													onInvalid={(ev) => {
														ev.preventDefault();
													}}
													maxLength={3}
													placeholder="e.g. 123"
												/>
											</div>
										</div>
									</div>
								</div>
								<button className="mt-2 w-full rounded-md bg-primary-900 px-4 py-3 text-white">
									Confirm
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
