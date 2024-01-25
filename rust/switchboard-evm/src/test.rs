/// Creates a dummy runtime environment for testing and debugging purposes.
pub fn init_test_runtime() {
    std::env::set_var("CHAIN_ID", "421613");

    // dummy
    let address = "0x331eB7B0b4c0F3d0724a33d551fC17fda53cFBBe";
    std::env::set_var("FUNCTION_KEY", &address);
    std::env::set_var("VERIFIER", &address);
    std::env::set_var("PAYER", &address);
    std::env::set_var("REWARD_RECEIVER", &address);
    std::env::set_var("VERIFYING_CONTRACT", &address);
    std::env::set_var("REWARD_RECEIVER", &address);
}
