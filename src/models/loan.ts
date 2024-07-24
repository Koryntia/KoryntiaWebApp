import {
	prop,
	getModelForClass,
	post,
	ModelOptions,
	Severity,
} from "@typegoose/typegoose";
import { FilterOutFunctionKeys } from "@typegoose/typegoose/lib/types";
import mongoose from "mongoose";

/**
 * We use the @post hook to convert the _id field to id of each document returned by the database.
 * This conversion is necessary because we will be sending these documents from the server to the client through Next.js Server Actions and Functions. The requirement is that the data transferred between the server and client should be serializable, and the ObjectId type is not serializable.
 */
@post<LoanClass>("save", function (doc) {
	if (doc) {
		doc.id = doc._id.toString();
		doc._id = doc.id;
	}
})
@post<LoanClass[]>(/^find/, function (docs) {
	// @ts-ignore
	if (this.op === "find") {
		docs.forEach((doc) => {
			doc.id = doc._id.toString();
			doc._id = doc.id;
		});
	}
})
@ModelOptions({
	schemaOptions: {
		timestamps: true,
		collection: "loans",
	},
})
class LoanClass {
	@prop({ required: true })
	borrowerAddress: string;

	@prop({ required: true })
	lenderAddress: string;

	@prop({ required: true })
	loanToken: string;

	@prop({ required: true })
	loanAmount: string;

	@prop({ required: true })
	collateralToken: string;

	@prop({ required: true })
	collateralAmount: string;

	@prop({ required: true })
	liquidationThreshold: string;

	@prop({ required: true })
	initialThreshold: string;

	@prop({ required: true })
	loanRepayDeadline: Date;

	@prop({ required: true })
	loanRequestDeadline: Date;

	@prop({ required: true })
	interestRate: string;

	@prop({ required: true })
	managerNFT: string;

	@prop({ default: "v1" })
	managerNFTVersion: string;

	@prop({ required: false })
	name: string;

	@prop({ required: false })
	imageUrl: string;

	_id: mongoose.Types.ObjectId | string;

	id: string;
}

const Loan = getModelForClass(LoanClass);

/**
 * `_TLoan`, is useful when interacting with results from the database.
 * We use FilterOutFunctionKeys to remove the functions from the LoanClass type, and only keep the properties/types.
 */
export type _TLoan = FilterOutFunctionKeys<LoanClass>;
/**
 * `TLoan`, is useful when interacting with the client, for example, when sending data from the server to the client.
 * We use Omit to remove the id and _id fields from the `_TLoan` type.
 */
export type TLoan = Omit<_TLoan, "id" | "_id">;

export { Loan, LoanClass };
